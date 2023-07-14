
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/hwdummy00', function(req, res, next) {
  const { name } = req.query;
  if (!name) {
    return res.status(400).send('Missing name query parameter');
  }
  return res.render('helloWorldDummy00', { name: name });
});

module.exports = router;
