const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Insert a new inquiry
async function insertInquiry(inquiry) {
  const result = await pool.query(
    `
    INSERT INTO inquiries
      (name, email, business, need, has_site, website_url, budget, message, preference, lang, status)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'new')
    RETURNING id
    `,
    [
      inquiry.name,
      inquiry.email,
      inquiry.business,
      inquiry.need,
      inquiry.hasSite,
      inquiry.websiteUrl,
      inquiry.budget,
      inquiry.message,
      inquiry.preference,
      inquiry.lang
    ]
  );

  return result.rows[0];
}

// Get all inquiries
async function listInquiries() {
  const result = await pool.query(
    `SELECT * FROM inquiries ORDER BY created_at DESC`
  );

  return result.rows;
}

// Update inquiry status
async function updateStatus(status, id) {
  const result = await pool.query(
    `
    UPDATE inquiries
    SET status = $1
    WHERE id = $2
    `,
    [status, id]
  );

  return result.rowCount;
}

module.exports = {
  pool,
  insertInquiry,
  listInquiries,
  updateStatus
};