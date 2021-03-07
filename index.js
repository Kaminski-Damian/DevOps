const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Fruit Server');
});

const PORT = 9090;

app.listen(PORT, () => {
    console.log(`API listen on port ${PORT}`);
})