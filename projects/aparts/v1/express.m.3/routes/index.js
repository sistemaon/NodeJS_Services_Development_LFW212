
const express = require('express');
const createHttpError = require('http-errors');
const router = express.Router();

router.use((req, res, next) => {
  if (req.method !== 'GET') {
    return next(createHttpError(405, 'Method Not Allowed!'))
  }
  return next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ex/root', (req, res, next) => {
  res.type('html');
  res.setHeader('Content-Type', 'text/html');
  const root = `<html>
    <head>
      <style>
      body { background: #333; margin: 1.25rem }
      a { color: yellow; font-size: 2rem; font-family: sans-serif }
      </style>
    </head>
    <body>
      <a href='/ex/hello'>Hello</a>
    </body>
    </html>
  `;
  return res.status(200).send(root);
});

router.get('/ex/hello', (req, res, next) => {
  res.type('html');
  res.setHeader('Content-Type', 'text/html');
  const hello = `<html>
    <head>
      <style>
      body { background: #333; margin: 1.25rem }
      h1 { color: #EEE; font-family: sans-serif }
      </style>
    </head>
    <body>
      <h1>Hello World</h1>
      <a href='/ex/root'>Back to root</a>
    </body>
  </html>`;
  return res.status(200).send(hello);
});

module.exports = router;
