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

function emailTemplate({ title, greeting, message, footer, lang = "en", details = "" }) {
  const rtl = lang === "ar";
  return `<!doctype html><html lang="${lang}" dir="${rtl ? "rtl" : "ltr"}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f3f5;font-family:Arial,Helvetica,sans-serif;color:#29242a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f3f5"><tr><td align="center" style="padding:32px 12px">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #eee3e8">
<tr><td style="padding:30px 32px;background:#651d38;text-align:center;color:#fff"><div style="font-size:24px;font-weight:700">Walaa Mansouri</div><div style="font-size:12px;letter-spacing:1px;color:#f3dfe8;margin-top:8px">WEB DEVELOPMENT & DIGITAL EXPERIENCES</div></td></tr>
<tr><td style="padding:34px 32px;text-align:${rtl ? "right" : "left"}"><h1 style="font-size:24px;line-height:1.4;color:#651d38;margin:0 0 20px">${esc(title)}</h1>
<p style="font-size:16px;line-height:1.8;margin:0 0 18px">${esc(greeting)}</p>
<p style="font-size:15px;line-height:1.85;color:#514b50;margin:0;white-space:pre-line">${esc(message)}</p>
${details}
<div style="border-top:1px solid #eee7e9;margin-top:30px;padding-top:22px;font-size:14px;line-height:1.8;color:#514b50"><strong style="color:#651d38">Walaa Mansouri</strong><div>Web Developer</div></div></td></tr>
<tr><td style="background:#faf7f8;padding:24px 30px;text-align:center"><a href="https://walaamansouri.com" style="color:#651d38;text-decoration:none;font-weight:bold;font-size:14px">walaamansouri.com</a><p style="font-size:12px;color:#847b81;margin:12px 0 0">${esc(footer)}</p></td></tr>
</table></td></tr></table></body></html>`;
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
  const from = { email: sender, name: process.env.BREVO_SENDER_NAME || "Walaa Mansouri" };
  const infoRows = info.map(([label, value]) =>
    `<tr><td style="padding:11px 12px;color:#6c6269;font-weight:bold;border-bottom:1px solid #f0e9ec;vertical-align:top;width:35%">${esc(label)}</td><td style="padding:11px 12px;color:#302830;border-bottom:1px solid #f0e9ec;white-space:pre-line;overflow-wrap:anywhere">${esc(value)}</td></tr>`
  ).join("");
  const ownerDetails = `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:26px;border:1px solid #f0e9ec;border-collapse:collapse;font-size:14px">${infoRows}</table>`;
  const ownerHtml = emailTemplate({
    title: "New project inquiry",
    greeting: "A new message has arrived through your portfolio contact form.",
    message: "Here are the details provided by the visitor. Reply directly to this email to contact them.",
    details: ownerDetails,
    footer: "Portfolio contact notification",
    lang: "en"
  });

  const confirmations = {
    en: {
      subject: "Thank you for reaching out!",
      title: "Thank you for your message!",
      greeting: `Hello ${name},`,
      message: "Thank you for your interest in working with me.\n\nI've received your project inquiry and will review it carefully. I'll get back to you as soon as possible.",
      footer: "This is an automatic confirmation of your inquiry."
    },
    fr: {
      subject: "Merci pour votre message !",
      title: "Votre message a bien été reçu !",
      greeting: `Bonjour ${name},`,
      message: "Merci pour votre intérêt et votre confiance.\n\nJ'ai bien reçu votre demande de projet. Je vais l'étudier attentivement et je vous répondrai dès que possible.",
      footer: "Ceci est une confirmation automatique de votre demande."
    },
    ar: {
      subject: "شكراً لتواصلك معي!",
      title: "تم استلام رسالتك بنجاح!",
      greeting: `مرحباً ${name}،`,
      message: "شكراً لاهتمامك بالتعاون معي.\n\nلقد استلمت طلبك وسأقوم بمراجعته بعناية والرد عليك في أقرب وقت ممكن.",
      footer: "هذه رسالة تأكيد تلقائية لاستلام طلبك."
    }
  };

  try {
    await sendBrevo(key, {
      sender: from,
      to: [{ email: owner }],
      replyTo: { email, name },
      subject: "New project inquiry - " + business,
      htmlContent: ownerHtml,
      textContent: "New project inquiry\n\n" + info.map(([label, value]) => `${label}: ${value}`).join("\n")
    });
  } catch {
    return json({ error: "Unable to send message" }, 502);
  }

  try {
    const c = confirmations[lang];
    await sendBrevo(key, {
      sender: from,
      to: [{ email, name }],
      subject: c.subject,
      htmlContent: emailTemplate({ ...c, lang }),
      textContent: `${c.title}\n\n${c.greeting}\n\n${c.message}\n\nWalaa Mansouri\nhttps://walaamansouri.com`
    });
  } catch {
    console.error("Visitor confirmation email failed");
    return json({ ok: true, confirmationSent: false });
  }
  return json({ ok: true, confirmationSent: true });
}
