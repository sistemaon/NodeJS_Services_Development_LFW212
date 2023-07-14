
const express = require('express');
const router = express.Router();
const hnLatestStream = require('hn-latest-stream');
const finished = require('stream').finished;

router.get('/', (req, res, next) => {

    const { amount = 10, type = 'html'} = req.query;

    if (type === 'html') res.type('text/html');
    if (type === 'json') res.type('application/json');

    const stream = hnLatestStream(amount, type);
    stream.pipe(res, { end: false });

    finished(stream, (err) => {
        if (err) return next(err);

        res.end();
    });

});

module.exports = router;