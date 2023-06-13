
const express = require('express');
const router = express.Router();

const retry = `<html>
    <head>
      <style>
      body { background: #333; margin: 1.25rem }
      h1 { color: #EEE; font-family: sans-serif }
      </style>
    </head>
    <body>
      <h1>Try Again Later.</h1>
      <p>Invalid request. Please try again.</p>
    </body>
  </html>`;

router.get('/', (req, res) => {
    res.send(retry);
})

module.exports = router;