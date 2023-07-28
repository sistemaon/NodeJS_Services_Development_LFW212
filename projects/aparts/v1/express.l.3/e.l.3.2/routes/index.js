
const express = require('express');
const createHttpError = require('http-errors');
const router = express.Router();

router.use((req, res, next) => {
  if (req.method !== 'GET') {
    return next(createHttpError(405));
  }
  return next();
})

router.get('/', function(req, res, next) {
  res.status(200).send('ok')
});

module.exports = router;
