# Walaa Mansouri — Contact/Inquiry Backend

Stores every contact-form submission in a database and sends two emails:
one notifying you, one confirming to the client. Built with Node.js,
Express, SQLite, and Nodemailer — no paid services required to start.

## 1. What was changed / created

**Frontend (in `frontend/`, same files you uploaded):**
- `index.html` — contact form rebuilt with all 9 fields from your spec
  (name, email, business, need, has-website + conditional URL, budget,
  message, contact preference), a hidden honeypot field, and a status
  message area. Visible email placeholders changed from your university
  address to `mansouriwalaa126@gmail.com` (see §3).
- `script.js` — new translation strings for EN/FR/AR for every new field;
  form submit handler rewritten to `fetch()` your backend API instead of
  building a `mailto:` link; shows/hides the website-URL field based on
  the Yes/No radio; client-side validation + status messages.
- `style.css` — small additions only: two-column name/email row, radio
  button styling, honeypot hiding, status message colors. Nothing else
  touched — your glassmorphism/purple aesthetic is untouched.

**Backend (new folder `backend/`):**
- `server.js` — Express API: `POST /api/inquiries` (public, rate-limited)
  and `GET/PATCH /api/inquiries` (admin-key protected, for a future
  dashboard).
- `db.js` — SQLite schema and prepared statements.
- `email.js` — Nodemailer setup + the two email templates (EN/FR/AR),
  each with 3 variants depending on contact preference (call / email /
  exploring).
- `package.json`, `.env.example` — dependencies and config template.

## 2. Database

**SQLite** (via `better-sqlite3`) — a single file (`inquiries.db`), zero
setup, perfect for one person's inquiries. No installation, no server to
manage. If you ever outgrow it (hundreds of clients, need multiple
people accessing it), migrating to Postgres later is a small change
confined to `db.js`.

The table is created automatically the first time the server starts:

```sql
CREATE TABLE inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  business TEXT NOT NULL,
  need TEXT NOT NULL,
  has_site TEXT NOT NULL DEFAULT 'no',
  website_url TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  preference TEXT NOT NULL DEFAULT 'email',
  lang TEXT NOT NULL DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'new'
);
```
`status` starts at `'new'` and can later be moved through `contacted`,
`call_booked`, `proposal_sent`, `won`, `lost` via the (already-built)
`PATCH /api/inquiries/:id/status` endpoint once you build a dashboard.

## 3. Environment variables you need

Copy `.env.example` to `.env` in the `backend` folder and fill it in:

| Variable | What it's for |
|---|---|
| `CONTACT_EMAIL` | **The only email address you manage.** Used as both the sender and the address that receives new-inquiry notifications. Set it to `mansouriwalaa126@gmail.com` now; when you get a domain email, change only this value. |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | Your email provider's SMTP server. Pre-filled for Gmail. |
| `SMTP_USER` | Same as `CONTACT_EMAIL` for now. |
| `SMTP_PASS` | A Gmail **App Password** (not your real password — see §4). |
| `BOOKING_URL` | Your call-booking link (§5). |
| `ALLOWED_ORIGINS` | Your live site's URL(s), so only your site can call this API. |
| `ADMIN_KEY` | A long random string — protects the (not-yet-built) admin endpoints. |

Nothing is hardcoded in the code — your university email does not
appear anywhere, and changing providers later never requires touching
`server.js` or `email.js`.

## 4. Configure the email service (Gmail App Password, free)

1. Go to your Google Account → **Security**.
2. Turn on **2-Step Verification** if it isn't already on (required for
   App Passwords).
3. Go to **Security → App passwords**.
4. Create one named "Website backend", copy the 16-character code.
5. Paste it into `.env` as `SMTP_PASS` (no spaces).

This lets the server send email *as* your Gmail account without storing
your actual password anywhere.

**When you get a domain email later:** most providers (Zoho Mail,
Google Workspace, etc.) give you SMTP host/port credentials the same
way — just update the 5 SMTP/`CONTACT_EMAIL` values in `.env`. No code
changes.

## 5. Configure the booking link

1. Create a free account at [cal.com](https://cal.com) or
   [calendly.com](https://calendly.com).
2. Set up one "15-30 min intro call" event type with your availability.
3. Copy its public booking URL (e.g. `https://cal.com/walaamansouri/intro-call`).
4. Paste it into `.env` as `BOOKING_URL`.

This link is only inserted into the confirmation email when someone
picks **"I'd like to book a call."** The other two options never
mention it.

## 6. Test the complete flow locally

```bash
cd backend
npm install
cp .env.example .env
# edit .env with your real values (CONTACT_EMAIL, SMTP_PASS, BOOKING_URL)
npm start
```

You should see `Backend listening on port 3000`. Now open
`frontend/index.html` directly in your browser (or run a simple static
server), and near the top of `script.js` temporarily set:

```js
const API_BASE_URL = 'http://localhost:3000';
```

Fill out the form and submit. You should see:
- A success message under the button.
- A new row in `backend/inquiries.db` (open it with the free "DB Browser
  for SQLite" app, or run `sqlite3 inquiries.db "SELECT * FROM inquiries;"`).
- A notification email arriving in your inbox.
- A confirmation email arriving at the address you tested with.

Try submitting with an invalid email, empty required fields, and each
of the 3 "how would you like to continue" options to see the different
email copy. Also try submitting the form 11 times quickly — the 11th
should get a "Too many requests" response (rate limiting working).

## 7. Deploy it

**Backend** — any small Node host works; simplest for a beginner:
- [Render.com](https://render.com) (free tier): New → Web Service →
  connect your repo → set root directory to `backend` → build command
  `npm install` → start command `npm start` → add all your `.env`
  variables in the dashboard's Environment tab.
- Note: Render's free tier has an ephemeral disk, so `inquiries.db` can
  reset on redeploys. Fine while testing; if you want the database to
  persist long-term on Render, add a paid persistent disk, or switch
  `db.js` to a hosted Postgres (e.g. Render's free Postgres, or Neon) —
  a small, well-contained change when you're ready.

**Frontend** — since it's static files:
- [Netlify](https://netlify.com) or [Vercel](https://vercel.com): drag
  and drop the `frontend` folder, or connect the repo. Both are free for
  this.
- Once deployed, update `API_BASE_URL` in `script.js` to your real
  backend URL (e.g. `https://your-backend.onrender.com`), and set
  `ALLOWED_ORIGINS` in the backend's `.env`/Render dashboard to your
  real frontend URL.

That's the whole chain: form → backend → database → email, ready for an
admin dashboard to be added later without changing this system.
