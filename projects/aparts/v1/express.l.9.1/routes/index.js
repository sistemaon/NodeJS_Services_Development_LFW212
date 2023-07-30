const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  try {
    setTimeout(() => {
      if (Array.isArray(req.query.un)) req.query.un = req.query.un[0];
      res.send((req.query.un || '').toUpperCase())
    }, 1000)    
  } catch (error) {
    return next(error);
  }
})

module.exports = router;
