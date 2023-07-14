
const express = require('express');
const router = express.Router();
const { URL } = require('url');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/hwdummy00', function (req, res, next) {
  const { name } = req.query;
  if (!name) {
    return res.status(400).send('Missing name query parameter');
  }
  return res.render('helloWorldDummy00', { name: name });
});


router.get('/hello/static/:pathName', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  if (req.method !== 'GET') {
    return res.status(405).send('Method in this route not allowed!');
  };

  const pathNames = [ 'hello', 'root' ];
  const { pathName } = req.params;
  if (!pathNames.includes(pathName)) {
    return res.status(404).send('Path Not Found!');
  }

  const root = `
    <html>
      <head>
        <style>
        body { background: #333; margin: 1.25rem }
        a { color: yellow; font-size: 2rem; font-family: sans-serif }
        </style>
      </head>
      <body>
        <a href='/hello/static/hello'>Hello</a>
      </body>
    </html>
  `;
  const hello = `
    <html>
      <head>
        <style>
        body { background: #333; margin: 1.25rem }
        h1 { color: #EEE; font-family: sans-serif }
      </style>
      </head>
      <body>
        <h1>Hello World</h1>
      </body>
    </html>
  `;

  const protocol = req.protocol;
  const host = req.headers.host;
  const path = req.path;
  const urlPath = `${protocol}://${host}${path}`;
  const url = new URL(urlPath);

  if (pathName === 'root' && url.pathname === '/hello/static/root') {
    return res.end(root);
  }
  if (pathName === 'hello' && url.pathname === '/hello/static/hello') {
    return res.end(hello);
  }

  return res.status(404).send('Not Found!');
});


module.exports = router;
