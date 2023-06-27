
const express = require('express');
const router = express.Router();
const bicycleModel = require('../models/bicycle');

router.get('/:id', function (req, res, next) {
    bicycleModel.bicycle.read(req.params.id, (err, result) => {
        if (err) {
            if (err.message === 'not found') next();
            else next(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = router;