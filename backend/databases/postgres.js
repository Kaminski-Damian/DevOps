const { Pool } = require('pg');

const pgClient = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
});

pgClient.on('connect', () => {
    console.log('[+] Connected to Postgres server');
});

module.exports = pgClient;
