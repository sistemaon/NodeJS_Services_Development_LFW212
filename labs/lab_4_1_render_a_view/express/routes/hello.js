const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  const greeting = 'greeting' in req.query ?
    req.query.greeting :
    'Hello';
  res.render('hello', { greeting: greeting });
});

module.exports = router;