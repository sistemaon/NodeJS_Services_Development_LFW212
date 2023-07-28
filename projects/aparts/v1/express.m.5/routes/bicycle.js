
const express = require('express');
const router = express.Router();
const model = require('../model');

router.get('/:id', (req, res, next) => {
  model.bicycle.read(req.params.id, (err, result) => {
    if (err) {
      if (err.message === 'not found') return next();
      else return next(err);
    } else {
      return res.status(200).send(result);
    }
  });
});

module.exports = router;
