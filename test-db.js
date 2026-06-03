const { Pool } = require('pg');
require('dotenv').config();

async function test() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected to DB! Time:', res.rows[0].now);
    
    const users = await pool.query('SELECT * FROM "User"');
    console.log('Users in DB:', users.rows);
  } catch (e) {
    console.error('DB Error:', e);
  } finally {
    pool.end();
  }
}

test();
