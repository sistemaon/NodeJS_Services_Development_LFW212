
const express = require('express');
const router = express.Router();
const model = require('../models/bikeModel');

router.get('/:id', (req, res, next) => {
    res.type('json');
    res.setHeader('Content-Type', 'application/json');

    const { id } = req.params;
    try {
        model.bicycle.read(id, (err, result) => {
            if (err) {
                return err.message === 'not found' ? next() : next(err);
            } else {
                return res.status(200).send(result);
            }
        });
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
