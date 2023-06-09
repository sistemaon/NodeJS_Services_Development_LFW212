
const http = require('node:http');
const dataLib = require('./data');

const PORT = 3000;
const HOST = 'localhost';
const URI = `http://${HOST}:${PORT}`;

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    const result = await dataLib();
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(result);
    return res.end();
  } else if (req.method === 'POST' && req.url === '/') {
    res.writeHead(405, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({ error: 'Method Not Allowed HTTP Status' }));
    return res.end();
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({ error: 'Not found' }));
    return res.end();
  }
});

server.listen(PORT, () => {
    console.log(`Server running at ${URI}`);
});
