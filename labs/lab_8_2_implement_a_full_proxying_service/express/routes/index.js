const express = require('express');
const router = express.Router();
const http = require('http');
const { Readable } = require('stream');

/* GET home page. */
router.get('/', (req, res, next) => {
  const { url } = req.query;
  try {
    new URL(url);
  } catch (err) {
    if (err.code === 'ERR_INVALID_URL') {
      return res.status(400).json('Bad Request!');
    }
    return res.status(404).json('Bad Request!');
  }

  http
    .get(url, (response) => {
      const contentType = 'application/json';
      const cookieType = 'test';
      res.setHeader('content-type', contentType);
      res.setHeader('cookie', cookieType);
      if (response.statusCode === 404) {
        return res.status(404).json('Not Found!');
      }
      if (response.statusCode === 400) {
        return res.status(400).json('Bad Request!');
      }
      if (response.statusCode === 301) {
        return res.status(301).json('Moved Permanently!');
      }
      response.setEncoding('utf8');
      const transformedData = Readable.from(response);
      transformedData.pipe(res);
    })
    .on('error', (err) => {
      if (err.code === 'ERR_INVALID_URL') {
        return res.status(404).json('Bad Request!');
      }
      return res.status(400).json('Not Found!');
    });
});

module.exports = router;
