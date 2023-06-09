
const express = require('express');
const dataLib = require('./data');

const PORT = 3000;
const HOST = 'localhost';
const URI = `http://${HOST}:${PORT}`;

const app = express();

app.get('/', async (req, res) => {
    const result = await dataLib();
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).send(result);
});

app.post('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(405).send(JSON.stringify({ error: 'Method Not Allowed HTTP Status' }));
});

app.get('*', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(404).send(JSON.stringify({ error: 'Not found' }));
});

app.listen(PORT, () => {
    console.log(`Server running at ${URI}`);
});
