const { Pool } = require('pg');

const pgClient = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
});

pgClient.on('connect', (client) => {
  console.log('[+] Connected to the Postgres server');
  client
    .query(
      `CREATE TABLE IF NOT EXISTS fruit (
			id serial PRIMARY KEY,
			name VARCHAR (50) UNIQUE NOT NULL,
			amount INT DEFAULT 0)`
    )
    .catch((err) => console.error(err));
});

pgClient.on('error', (err) => {
  console.log('[-] Failed to connect to the Postgres server');
  console.error(err);
});

module.exports = pgClient;
