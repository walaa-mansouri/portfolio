const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true', // true for port 465, false for 587/25
  auth: {
    user: process.env.SMTP_USER || process.env.CONTACT_EMAIL,
    pass: process.env.SMTP_PASS
  },
  connectionTimeout: 8000,
  greetingTimeout: 8000,
  socketTimeout: 8000
});

const NEED_LABELS = {
  new: 'New website', redesign: 'Redesign an existing site', landing: 'Landing page',
  booking: 'Website + booking', multilingual: 'Multilingual website', unsure: 'Not sure yet'
};
const BUDGET_LABELS = {
  under500: 'Under €500', '500-750': '€500 – €750', '750-1000': '€750 – €1,000',
  '1000plus': '€1,000+', unsure: 'Not sure'
};
const PREF_LABELS = {
  call: 'Wants to book a call', email: 'Prefers email', exploring: 'Just exploring'
};

// --- Email #1: notification to you, the business owner ---
async function sendOwnerNotification(inquiry) {
  const need = NEED_LABELS[inquiry.need] || inquiry.need;
  const budget = BUDGET_LABELS[inquiry.budget] || inquiry.budget || 'Not specified';
  const pref = PREF_LABELS[inquiry.preference] || inquiry.preference;

  const html = `
    <h2>New project inquiry from ${inquiry.name}</h2>
    <p><strong>Business:</strong> ${inquiry.business}</p>
    <p><strong>Email:</strong> ${inquiry.email}</p>
    <p><strong>Need:</strong> ${need}</p>
    <p><strong>Has a website already:</strong> ${inquiry.hasSite === 'yes' ? 'Yes - ' + (inquiry.websiteUrl || 'no URL given') : 'No'}</p>
    <p><strong>Budget:</strong> ${budget}</p>
    <p><strong>How they want to continue:</strong> ${pref}</p>
    <p><strong>Message:</strong><br>${(inquiry.message || '').replace(/\n/g, '<br>')}</p>
    <hr>
    <p style="color:#888;font-size:12px;">Submitted via the contact form on walaamansouri.com</p>
  `;

  await transporter.sendMail({
    from: `"Website inquiries" <${process.env.CONTACT_EMAIL}>`,
    to: process.env.CONTACT_EMAIL,
    replyTo: inquiry.email,
    subject: `New project inquiry - ${inquiry.business || inquiry.name}`,
    html
  });
}

// --- Email #2: confirmation to the client ---
// Three distinct copies depending on how they want to continue.
const CONFIRMATION_TEMPLATES = {
  en: (inquiry) => {

    const html = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thanks for reaching out - Walaa Mansouri</title>
</head>

<body style="margin:0;padding:0;background-color:#eeecf7;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#eeecf7" style="background-color:#eeecf7;">
    <tr>
      <td style="padding:32px 16px;">
        <table align="center" width="600" border="0" cellpadding="0" cellspacing="0"
          style="max-width:600px;width:100%;margin:0 auto;background-color:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 10px 40px rgba(70,50,140,0.10);">

          <!-- HERO IMAGE (calm, no headline baked in) -->
          <tr>
            <td style="line-height:0;font-size:0;">
              <img src="https://walaa-mansouri.github.io/portfolio/img/hero-confirm.jpg" width="600" height="230" alt=""
                style="display:block;width:100%;height:auto;max-width:600px;">
            </td>
          </tr>

          <!-- HEADING -->
          <tr>
            <td style="padding:34px 32px 8px;">
              <div
                style="color:#4633a8;font-size:26px;font-weight:700;letter-spacing:-0.01em;line-height:1.25;font-family:Georgia,serif;margin-bottom:14px;">
                Thank you for reaching out!
              </div>
              <p style="color:#33324a;font-size:14.5px;line-height:1.65;margin:0 0 8px;">
                Hi ${inquiry.name},
              </p>
              <p style="color:#33324a;font-size:14.5px;line-height:1.65;margin:0;">
                Thanks for telling me about your project. I've received your message and will review the details
                carefully you'll hear back from me within 1-2 business days.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 32px 8px;">
              <div style="height:1px;background:linear-gradient(90deg,#f4f2fb,#d9c9f7,#c7cdf5,#f4f2fb);"></div>
            </td>
          </tr>

          <!-- WHAT HAPPENS NEXT -->
          <tr>
            <td style="padding:0px 24px 8px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0"
                style="background:linear-gradient(135deg,#f3effe,#faf8ff,#eef0fc);border-radius:14px;">
                <tr>
                  <td style="padding:26px 26px;">
                    <div
                      style="color:#4633a8;font-size:16px;font-weight:700;font-family:Georgia,serif;margin-bottom:16px;">
                      What happens next
                    </div>
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="28" valign="top" style="color:#a259e6;font-weight:700;font-size:13px;padding:6px 0;">
                          01</td>
                        <td style="color:#33324a;font-size:13.5px;line-height:1.6;padding:6px 0;">I'll read through what
                          you shared about your business and what you need.</td>
                      </tr>
                      <tr>
                        <td width="28" valign="top" style="color:#a259e6;font-weight:700;font-size:13px;padding:6px 0;">
                          02</td>
                        <td style="color:#33324a;font-size:13.5px;line-height:1.6;padding:6px 0;">I'll reply personally
                          by email with initial thoughts and any questions.</td>
                      </tr>
                      <tr>
                        <td width="28" valign="top" style="color:#a259e6;font-weight:700;font-size:13px;padding:6px 0;">
                          03</td>
                        <td style="color:#33324a;font-size:13.5px;line-height:1.6;padding:6px 0;">If it's a good fit,
                          we'll set up a short call or continue by email whichever you prefer.</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:32px 32px 8px;text-align:center;">
              <p style="color:#4a4860;font-size:14px;line-height:1.6;margin:0 0 20px;">
                Prefer to talk it through directly? Just reply to this email, or book a time that works for you.
              </p>
              <a href="${process.env.WHATSAPP_URL}"
                style="display:inline-block;background:linear-gradient(135deg,#e879f9,#a78bfa,#818cf8);color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:13px 30px;border-radius:999px;">
                Book a call &#8594;
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:36px 32px 34px;">
              <div style="height:1px;background:#eeecf7;margin-bottom:24px;"></div>
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align:center;">
                    <div style="font-family:Georgia,serif;font-size:15px;font-weight:700;color:#1e1b2e;">Walaa Mansouri
                    </div>
                    <div style="font-size:12.5px;color:#8a8896;margin-top:3px;">Web Developer &middot; Paris</div>
                    <div
                      style="font-family:'Courier New',monospace;font-size:11.5px;color:#a259e6;margin-top:6px;letter-spacing:0.05em;">
                      FR &middot; EN &middot; AR</div>
                    <div style="font-size:12.5px;color:#8a8896;margin-top:10px;">
                      <a href="mailto:mansouriwalaa126@gmail.com"
                        style="color:#7c6fd4;text-decoration:none;">mansouriwalaa126@gmail.com</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>

</html>

`;

    return {
      subject: 'Thanks for reaching out — Walaa Mansouri',
      html
    };
  },

  fr: (inquiry) => {
    const intro = `<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Merci de m'avoir contact&eacute;e - Walaa Mansouri</title>
</head>

<body style="margin:0;padding:0;background-color:#eeecf7;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#eeecf7" style="background-color:#eeecf7;">
    <tr>
      <td style="padding:32px 16px;">
        <table align="center" width="600" border="0" cellpadding="0" cellspacing="0"
          style="max-width:600px;width:100%;margin:0 auto;background-color:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 10px 40px rgba(70,50,140,0.10);">

          <!-- HERO IMAGE (calm, no headline baked in) -->
          <tr>
            <td style="line-height:0;font-size:0;">
              <img src="images/hero-confirm.jpg" width="600" height="230" alt=""
                style="display:block;width:100%;height:auto;max-width:600px;">
            </td>
          </tr>

          <!-- HEADING -->
          <tr>
            <td style="padding:34px 32px 8px;">
              <div
                style="color:#4633a8;font-size:26px;font-weight:700;letter-spacing:-0.01em;line-height:1.25;font-family:Georgia,serif;margin-bottom:14px;">
                Merci de m'avoir contact&eacute;e&nbsp;!
              </div>
              <p style="color:#33324a;font-size:14.5px;line-height:1.65;margin:0 0 8px;">
                Bonjour ${inquiry.name},
              </p>
              <p style="color:#33324a;font-size:14.5px;line-height:1.65;margin:0;">
                Merci de m'avoir parl&eacute; de votre projet. J'ai bien re&ccedil;u votre message et je vais l'examiner
                attentivement vous aurez de mes nouvelles sous 1 &agrave; 2 jours ouvr&eacute;s.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 32px 8px;">
              <div style="height:1px;background:linear-gradient(90deg,#f4f2fb,#d9c9f7,#c7cdf5,#f4f2fb);"></div>
            </td>
          </tr>

          <!-- WHAT HAPPENS NEXT -->
          <tr>
            <td style="padding:0px 24px 8px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0"
                style="background:linear-gradient(135deg,#f3effe,#faf8ff,#eef0fc);border-radius:14px;">
                <tr>
                  <td style="padding:26px 26px;">
                    <div
                      style="color:#4633a8;font-size:16px;font-weight:700;font-family:Georgia,serif;margin-bottom:16px;">
                      Ce qui va se passer
                    </div>
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="28" valign="top" style="color:#a259e6;font-weight:700;font-size:13px;padding:6px 0;">
                          01</td>
                        <td style="color:#33324a;font-size:13.5px;line-height:1.6;padding:6px 0;">Je vais lire
                          attentivement ce que vous m'avez partag&eacute; sur votre entreprise et vos besoins.</td>
                      </tr>
                      <tr>
                        <td width="28" valign="top" style="color:#a259e6;font-weight:700;font-size:13px;padding:6px 0;">
                          02</td>
                        <td style="color:#33324a;font-size:13.5px;line-height:1.6;padding:6px 0;">Je vous
                          r&eacute;pondrai personnellement par email avec mes premi&egrave;res impressions et mes
                          questions.</td>
                      </tr>
                      <tr>
                        <td width="28" valign="top" style="color:#a259e6;font-weight:700;font-size:13px;padding:6px 0;">
                          03</td>
                        <td style="color:#33324a;font-size:13.5px;line-height:1.6;padding:6px 0;">Si c'est le bon
                          projet, nous planifierons un court appel ou continuerons par email, selon votre
                          pr&eacute;f&eacute;rence.</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:32px 32px 8px;text-align:center;">
              <p style="color:#4a4860;font-size:14px;line-height:1.6;margin:0 0 20px;">
                Vous pr&eacute;f&eacute;rez en discuter directement&nbsp;? R&eacute;pondez simplement &agrave; cet
                email, ou r&eacute;servez un cr&eacute;neau qui vous convient.
              </p>
              <a href="${process.env.WHATSAPP_URL}"
                style="display:inline-block;background:linear-gradient(135deg,#e879f9,#a78bfa,#818cf8);color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:13px 30px;border-radius:999px;">
                R&eacute;server un appel &#8594;
              </a>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:36px 32px 34px;">
              <div style="height:1px;background:#eeecf7;margin-bottom:24px;"></div>
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align:center;">
                    <div style="font-family:Georgia,serif;font-size:15px;font-weight:700;color:#1e1b2e;">Walaa Mansouri
                    </div>
                    <div style="font-size:12.5px;color:#8a8896;margin-top:3px;">D&eacute;veloppeuse web &middot; Paris
                    </div>
                    <div
                      style="font-family:'Courier New',monospace;font-size:11.5px;color:#a259e6;margin-top:6px;letter-spacing:0.05em;">
                      FR &middot; EN &middot; AR</div>
                    <div style="font-size:12.5px;color:#8a8896;margin-top:10px;">
                      <a href="mailto:mansouriwalaa126@gmail.com"
                        style="color:#7c6fd4;text-decoration:none;">mansouriwalaa126@gmail.com</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>

</html>`;

    return { subject: 'Merci pour votre message — Walaa Mansouri', html: `${intro}${middle}<p>À bientôt,<br>Walaa</p>` };
  },
  ar: (inquiry) => {
    const intro = `<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>شكرًا لتواصلك معي - ولاء منصوري</title>
</head>

<body dir="rtl" style="margin:0;padding:0;background-color:#eeecf7;font-family:Tahoma,Arial,sans-serif;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#eeecf7" style="background-color:#eeecf7;">
    <tr>
      <td style="padding:32px 16px;">
        <table align="center" width="600" border="0" cellpadding="0" cellspacing="0" dir="rtl"
          style="max-width:600px;width:100%;margin:0 auto;background-color:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 10px 40px rgba(70,50,140,0.10);">

          <!-- HERO IMAGE (calm, no headline baked in) -->
          <tr>
            <td style="line-height:0;font-size:0;">
              <img src="images/hero-confirm.jpg" width="600" height="230" alt=""
                style="display:block;width:100%;height:auto;max-width:600px;">
            </td>
          </tr>

          <!-- HEADING -->
          <tr>
            <td style="padding:34px 32px 8px;">
              <div
                style="color:#4633a8;font-size:26px;font-weight:700;letter-spacing:-0.01em;line-height:1.25;font-family:Georgia,serif;margin-bottom:14px;;text-align:right">
                شكرًا لتواصلك معي!
              </div>
              <p style="color:#33324a;font-size:14.5px;line-height:1.65;margin:0 0 8px;;text-align:right">
                مرحبًا ${inquiry.name}،
              </p>
              <p style="color:#33324a;font-size:14.5px;line-height:1.65;margin:0;;text-align:right">
                شكرًا لإخباري عن مشروعك. لقد استلمت رسالتك وسأراجع التفاصيل بعناية، وستصلك ردودي خلال يوم إلى يومي عمل.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 32px 8px;">
              <div style="height:1px;background:linear-gradient(90deg,#f4f2fb,#d9c9f7,#c7cdf5,#f4f2fb);"></div>
            </td>
          </tr>

          <!-- WHAT HAPPENS NEXT -->
          <tr>
            <td style="padding:0px 24px 8px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0"
                style="background:linear-gradient(135deg,#f3effe,#faf8ff,#eef0fc);border-radius:14px;">
                <tr>
                  <td style="padding:26px 26px;">
                    <div
                      style="color:#4633a8;font-size:16px;font-weight:700;font-family:Georgia,serif;margin-bottom:16px;;text-align:right">
                      ما الذي سيحدث بعد ذلك
                    </div>
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="28" valign="top" style="color:#a259e6;font-weight:700;font-size:13px;padding:6px 0;">
                          01</td>
                        <td style="color:#33324a;font-size:13.5px;line-height:1.6;padding:6px 0;;text-align:right">سأقرأ
                          بعناية ما شاركته عن نشاطك التجاري واحتياجاتك.</td>
                      </tr>
                      <tr>
                        <td width="28" valign="top" style="color:#a259e6;font-weight:700;font-size:13px;padding:6px 0;">
                          02</td>
                        <td style="color:#33324a;font-size:13.5px;line-height:1.6;padding:6px 0;;text-align:right">سأرد
                          عليك شخصيًا عبر البريد الإلكتروني مع أفكاري الأولية وأي أسئلة.</td>
                      </tr>
                      <tr>
                        <td width="28" valign="top" style="color:#a259e6;font-weight:700;font-size:13px;padding:6px 0;">
                          03</td>
                        <td style="color:#33324a;font-size:13.5px;line-height:1.6;padding:6px 0;;text-align:right">إذا
                          كان المشروع مناسبًا، سننظم مكالمة قصيرة أو نواصل عبر البريد الإلكتروني، حسب ما يناسبك.</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:32px 32px 8px;text-align:center;">
              <p style="color:#4a4860;font-size:14px;line-height:1.6;margin:0 0 20px;;text-align:right">
                تفضّل التحدث مباشرة؟ فقط ردّ على هذا البريد الإلكتروني، أو احجز موعدًا يناسبك.
              </p>
              <a href="${process.env.WHATSAPP_URL}"
                style="display:inline-block;background:linear-gradient(135deg,#e879f9,#a78bfa,#818cf8);color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:13px 30px;border-radius:999px;">
                احجز مكالمة &#8592; </a>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:36px 32px 34px;">
              <div style="height:1px;background:#eeecf7;margin-bottom:24px;"></div>
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align:center;">
                    <div style="font-family:Georgia,serif;font-size:15px;font-weight:700;color:#1e1b2e;">Walaa Mansouri
                    </div>
                    <div style="font-size:12.5px;color:#8a8896;margin-top:3px;;text-align:right">مطوّرة مواقع · باريس
                    </div>
                    <div
                      style="font-family:'Courier New',monospace;font-size:11.5px;color:#a259e6;margin-top:6px;letter-spacing:0.05em;">
                      FR &middot; EN &middot; AR</div>
                    <div style="font-size:12.5px;color:#8a8896;margin-top:10px;;text-align:right">
                      <a href="mailto:mansouriwalaa126@gmail.com"
                        style="color:#7c6fd4;text-decoration:none;">mansouriwalaa126@gmail.com</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>

</html>`;

    return { subject: 'شكرًا لتواصلك — ولاء منصوري', html: `${intro}${middle}<p>إلى اللقاء،<br>ولاء</p>` };
  }
};

async function sendClientConfirmation(inquiry) {
  const build = CONFIRMATION_TEMPLATES[inquiry.lang] || CONFIRMATION_TEMPLATES.en;
  const { subject, html } = build(inquiry);

  await transporter.sendMail({
    from: `"Walaa Mansouri" <${process.env.CONTACT_EMAIL}>`,
    to: inquiry.email,
    subject,
    html
  });
}

module.exports = { sendOwnerNotification, sendClientConfirmation };
