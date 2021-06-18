const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const serverId = uuidv4();
const fruitRoutes = require('./routes/fruit');

app.use(express.json());
app.use(cors());

app.get('/info', (req, res) => {
  res.send(`Server: ${serverId}`);
});

app.use('/fruit', fruitRoutes);

app.listen(process.env.PORT, () => {
  console.log(`[+] Server running on port: ${process.env.PORT}`);
});
