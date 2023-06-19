const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const valueUpper = (value) => Array.isArray(value) ? value.map(element => element.toString().toUpperCase()) : value.toUpperCase();

router.get('/', (req, res, next) => {
  setTimeout(() => {
    try {
      const { un } = req.query;
      if (!un) {
        return res.status(404).json({ message: 'Not Found!' });
      }
      return res.send(valueUpper(un));
    } catch (error) {
      return next(error);
    }
  }, 1000)
});

module.exports = router;
