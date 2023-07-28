
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function(req, res, next) {
  res.render('greet');
});

router.get('/hello/greet', function(req, res, next) {
  const greeting = 'greeting' in req.query ? req.query.greeting : ':) Hello'
  res.render('hello', { greeting: greeting });
});

module.exports = router;
