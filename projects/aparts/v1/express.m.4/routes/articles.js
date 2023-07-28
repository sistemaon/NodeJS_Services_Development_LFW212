
const express = require('express');
const router = express.Router();
const hnLatestStream = require('hn-latest-stream');
const createHttpError = require('http-errors');
const finished = require('stream').finished;

router.get('/', (req, res, next) => {
    try {
        const { amount = 10, type = 'html' } = req.query;
        
        if (type !== 'html' && type !== 'json') return next(createHttpError(405));
        if (type === 'html') res.type('text/html');
        if (type === 'json') res.type('application/json');


        const hnStream = hnLatestStream(amount, type);

        hnStream.pipe(res, { end: false });

        finished(hnStream, (err) => {
            if (err) {
                return next(err);
            }
            return res.end();
        });        
    } catch (error) {
        return next(error);
    }
})


module.exports = router;
