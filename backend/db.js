const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'inquiries.db'));

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS inquiries (
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
`);

const insertInquiry = db.prepare(`
  INSERT INTO inquiries
    (name, email, business, need, has_site, website_url, budget, message, preference, lang, status)
  VALUES
    (@name, @email, @business, @need, @hasSite, @websiteUrl, @budget, @message, @preference, @lang, 'new')
`);

const listInquiries = db.prepare(`SELECT * FROM inquiries ORDER BY created_at DESC`);
const updateStatus = db.prepare(`UPDATE inquiries SET status = ? WHERE id = ?`);

module.exports = { db, insertInquiry, listInquiries, updateStatus };
