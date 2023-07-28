
const express = require('express');
const router = express.Router();
const finished = require('stream').finished;
const dataStream = require('../stream');

router.get('/', (req, res, next) => {
    try {
        res.type('html');
        const data = dataStream();
        data.pipe(res, { end: false });
        finished(data, (err) => {
            if (err) return next(err);
            res.end();
        });
    } catch (error) {
        return next(error);
    }
})

module.exports = router;
