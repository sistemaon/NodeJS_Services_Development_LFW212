const express = require('express');
const router = express.Router();
const finished = require('stream').finished;
const { Readable, Transform } = require('stream');

const stream = () => {
  const readable = Readable.from(['this', 'is', 'a', 'stream', 'of', 'data'].map((s) => s + '<br>'))
  const delay = new Transform(({transform (chunk, enc, cb) {setTimeout(cb, 500, null, chunk)}}))
  return readable.pipe(delay)
}

router.get('/', function(req, res, next) {
  const data = stream()
  data.pipe(res, {end: false})
  finished(data, (err) => {
    if (err) {
      next(err)
      return
    }
    res.end()
  })
});
  
module.exports = router;