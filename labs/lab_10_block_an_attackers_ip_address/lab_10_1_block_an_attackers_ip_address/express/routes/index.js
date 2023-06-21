
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  const ips = ['111.34.55.211'];
  if (ips.includes(req.socket.remoteAddress)) {
    const err = new Error('Forbidden');
    err.status = 403;
    return next(err);
  }
  next();
});

/* GET home page. */
router.get('/', (req, res, next) => {
  res.status(200).json({ title: 'Express' });
});

module.exports = router;
