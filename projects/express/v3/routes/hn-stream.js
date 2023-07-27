
const express = require('express');
const router = express.Router();

const hnLatestNews = require('hn-latest-stream');
const finished = require('stream').finished;

router.get('/', (req, res, next) => {

    const { amount = 10, type = 'html' } = req.query;

    type === 'html' ? res.type('text/html') : type === 'json' ? res.type('application/json') : res.type('text/html');

    const hnStream = hnLatestNews( amount, type );

    hnStream.pipe(res, { end: false });

    finished( hnStream, (err) => {
        if (err) {
            return next(err);
        }
        res.end();
    });

});

module.exports = router;
