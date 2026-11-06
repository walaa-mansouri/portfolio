const NEED = new Set(["new", "redesign", "landing", "booking", "multilingual", "unsure"]);
const BUDGET = new Set(["", "under500", "500-750", "750-1000", "1000plus", "unsure"]);
const PREF = new Set(["call", "email", "exploring"]);
const LANG = new Set(["en", "fr", "ar"]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v, max) => typeof v === "string" ? v.trim().slice(0, max) : "";
const esc = (v) => String(v).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const json = (data, status = 200) => Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
async function sendBrevo(key, payload) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": key, "content-type": "application/json", "accept": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    console.error("Brevo request failed:", response.status);
    throw new Error("Email provider rejected request");
  }
}

const encode = new TextEncoder();
async function sha256(value) {
  const bytes = await crypto.subtle.digest("SHA-256", encode.encode(value));
  return Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, "0")).join("");
}

const RATE_SCRIPT = `
for i = 1, #KEYS do
  local current = tonumber(redis.call("GET", KEYS[i]) or "0")
  local limit = tonumber(ARGV[i + 1])

  if current >= limit then
    return 0
  end
end

local ttl = tonumber(ARGV[1])

for i = 1, #KEYS do
  local count = redis.call("INCR", KEYS[i])

  if count == 1 then
    redis.call("EXPIRE", KEYS[i], ttl)
  end
end

return 1
`;

async function rateLimit(request, email) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const salt = process.env.RATE_LIMIT_SALT;

  if (!url || !token || !salt) {
    throw new Error("Rate limiter is not configured");
  }

  const ip = request.headers.get("x-nf-client-connection-ip");

  if (!ip) {
    throw new Error("Client IP unavailable");
  }

  const ipHash = await sha256(salt + ":ip:" + ip);
  const emailHash = await sha256(
    salt + ":email:" + email.trim().toLowerCase()
  );

  const keys = [
    "portfolio:contact:ip:" + ipHash,
    "portfolio:contact:email:" + emailHash,
    "portfolio:contact:global"
  ];

  const response = await fetch(url.replace(/\/$/, ""), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify([
      "EVAL",
      RATE_SCRIPT,
      3,
      ...keys,
      3600,
      8,
      3,
      120
    ]),
    signal: AbortSignal.timeout(5000)
  });

  if (!response.ok) {
    console.error("Upstash HTTP status:", response.status);
    throw new Error("Rate limiter unavailable");
  }

  const result = await response.json();

  if (result.error) {
    console.error("Upstash command error:", result.error);
    throw new Error("Rate limiter command failed");
  }

  if (result.result !== 0 && result.result !== 1) {
    throw new Error("Invalid rate limiter response");
  }

  return result.result === 1;
}

export default async function handler(request) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  const expectedOrigin = process.env.CONTACT_ALLOWED_ORIGIN;
  if (!expectedOrigin) return json({ error: "Contact form not configured" }, 503);
  if (request.headers.get("origin") !== expectedOrigin) return json({ error: "Forbidden origin" }, 403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))
    return json({ error: "Expected JSON" }, 415);
  const size = Number(request.headers.get("content-length") || 0);
  if (size > 12000) return json({ error: "Payload too large" }, 413);
  let body;
  try {
    const raw = await request.text();
    if (raw.length > 12000) return json({ error: "Payload too large" }, 413);
    body = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw Error();
  } catch { return json({ error: "Invalid JSON" }, 400); }
  if (body.companyWebsite) return json({ ok: true });
  const name = clean(body.name, 200), email = clean(body.email, 200),
    business = clean(body.business, 200), message = clean(body.message, 3000),
    need = clean(body.need, 40), hasSite = body.hasSite === "yes" ? "yes" : "no",
    websiteUrl = hasSite === "yes" ? clean(body.websiteUrl, 300) : "",
    budget = clean(body.budget, 40), preference = clean(body.preference, 40),
    lang = clean(body.lang, 10);
  if (!name || !email || !EMAIL.test(email) || !business || !message ||
    !NEED.has(need) || !BUDGET.has(budget) || !PREF.has(preference) || !LANG.has(lang))
    return json({ error: "Invalid fields" }, 400);
  if (websiteUrl) {
    try { if (!["https:", "http:"].includes(new URL(websiteUrl).protocol)) throw Error(); }
    catch { return json({ error: "Invalid website URL" }, 400); }
  }
  // A quick-submit heuristic. Attackers can forge this value; Redis limits remain authoritative.
  const startedAt = Number(body.formStartedAt);
  if (!Number.isFinite(startedAt) || startedAt <= 0 ||
    Date.now() - startedAt < 2500 || Date.now() - startedAt > 86400000) {
    return json({ error: "Please take a moment and try again" }, 400);
  }
  try {
    if (!await rateLimit(request, email)) {
      return json({ error: "Too many requests. Try again later." }, 429);
    }
  } catch (error) {
    console.error("Contact form rate limit unavailable:", error.message);
    return json({ error: "Contact form temporarily unavailable" }, 503);
  }
  const key = process.env.BREVO_API_KEY, sender = process.env.BREVO_SENDER_EMAIL,
    owner = process.env.CONTACT_EMAIL;
  if (!key || !sender || !owner) {
    console.error("Missing Brevo environment variables");
    return json({ error: "Email service not configured" }, 503);
  }
  const info = [
    ["Name", name], ["Email", email], ["Business", business], ["Project type", need],
    ["Already has a site", hasSite], ["Website URL", websiteUrl || "N/A"],
    ["Budget", budget || "Not specified"], ["Preference", preference],
    ["Language", lang], ["Message", message]
  ];
  const ownerHtml = '<h2>New portfolio inquiry</h2>' + info.map(([k, v]) => `<p><strong>${esc(k)}:</strong> ${esc(v).replace(/\n/g, "<br>")}</p>`).join("");
  const confirmations = {
    en: { subject: "Thank you for contacting me", text: `Hello ${name},\n\nThank you for your message. I have received your project inquiry and will get back to you soon.\n\nBest regards,\nWalaa Mansouri` },
    fr: { subject: "Merci pour votre message", text: `Bonjour ${name},\n\nMerci pour votre message. J'ai bien reçu votre demande et je vous répondrai prochainement.\n\nCordialement,\nWalaa Mansouri` },
    ar: { subject: "شكراً لتواصلك", text: `مرحباً ${name}،\n\nشكراً لرسالتك. لقد استلمت طلبك وسأرد عليك قريباً.\n\nمع تحياتي،\nولاء منصوري` }
  };
  const from = { email: sender, name: process.env.BREVO_SENDER_NAME || "Walaa Mansouri" };
  try {
    // Notify owner first. If it fails, return an error and don't claim success.
    await sendBrevo(key, {
      sender: from, to: [{ email: owner }],
      replyTo: { email, name }, subject: "New project inquiry - " + business,
      htmlContent: ownerHtml
    });
  } catch { return json({ error: "Unable to send message" }, 502); }
  try {
    const c = confirmations[lang];
    await sendBrevo(key, {
      sender: from, to: [{ email, name }],
      subject: c.subject, textContent: c.text
    });
  } catch {
    // Owner has the message, so do not prompt a duplicate submission.
    console.error("Visitor confirmation email failed");
    return json({ ok: true, confirmationSent: false });
  }
  return json({ ok: true, confirmationSent: true });
}
