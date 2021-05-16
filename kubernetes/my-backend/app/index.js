const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const appId = uuidv4();

app.get('/api', (req, res) => {
  res.send(`ID: ${appId}`);
});

const appPort = 5000;

app.listen(appPort, () => {
  console.log(`App listening on port ${appPort}`);
});
