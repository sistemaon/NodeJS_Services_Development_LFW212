const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/root', (req, res, next) => {
  const root = `<html>
  <head>
    <style>
     body { background: #333; margin: 1.25rem }
     a { color: yellow; font-size: 2rem; font-family: sans-serif }
    </style>
  </head>
  <body>
    <a href='/hello'>Hello</a>
  </body>
  </html>
  `
  res.status(200).send(root);
});

router.get('/hello', (req, res, next) => {
  const hello = `<html>
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
  `
  res.status(200).send(hello);
});

module.exports = router;
