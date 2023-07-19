const express = require('express');
const router = express.Router();
const model = require('../models/lab.5.1.model');

router.get('/:id', function (req, res, next) {
    model.boat.read(req.params.id, (err, result) => {
        if (err) {
            err && err.message === 'not found' ? next() : next(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;