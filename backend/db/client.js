
//we could use the fancier "pool" pg module later on, but this simple setup should work for now

// const { Client } = require('pg') // imports the pg module
// const client = new Client('postgres://localhost:5432/hikeandseek');

// module.exports = client



const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/hikeandseek';

const client = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = client;
