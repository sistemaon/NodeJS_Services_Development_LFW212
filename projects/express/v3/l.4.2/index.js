
const express = require('express');
const router = express.Router();
const dataStream = require('./stream');
const finished = require('stream').finished;

router.get('/', (req, res, next) => {
    res.type('json');
    res.setHeader('Content-Type', 'application/json');
    const data = dataStream();
    data.pipe(res, { end: false });
    try {
        finished(data, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).send();
        })
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
