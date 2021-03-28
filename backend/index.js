const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const fruitRoutes = require('./routes/fruit');

const pgClient = require('./databases/postgres');

const app = express();

app.use(express.json());
app.use(cors());

pgClient
    .query(
        `CREATE TABLE IF NOT EXISTS fruit (
            id serial PRIMARY KEY,
            name VARCHAR ( 50 ) UNIQUE NOT NULL,
            amount INT DEFAULT 0
        )`
    )
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello Fruit!');
});

app.use('/fruit', fruitRoutes);

app.listen(process.env.PORT, () => {
    console.log(
        `[+] Server running in ${process.env.NODE_ENV} mode one port ${process.env.PORT}`
    );
});
