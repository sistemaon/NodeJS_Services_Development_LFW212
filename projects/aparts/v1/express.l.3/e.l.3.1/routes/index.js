
const express = require('express');
const router = express.Router();
const dataByte = require('../data');

router.get('/', (req, res, next) => {
  res.type('application/json');
  res.setHeader('Content-Type', 'application/json');
  const data = dataByte();
  data.then((result) => res.status(200).send(result))
  .catch(err => next(err));
});

module.exports = router;
