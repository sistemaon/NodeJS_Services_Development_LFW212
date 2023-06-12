const express = require('express');
const router = express.Router();
const model = require('../model');

router.get('/:id', function (req, res, next) {
    model.boat.read(req.params.id, (err, result) => {
        if (err) {
            if (err.message === 'not found') next();
            else next(err);
        } else {
            res.json(result);
        }
    });
});

router.post('/', function (req, res, next) {
    const id = model.boat.uid();
    model.boat.create(id, req.body.data, (err, result) => {
        if (err) next(err);
        else {
            res.status(201).json({ id: result });
        }
    });
});

router.delete('/:id', function (req, res, next) {
    const id = req.params.id;
    model.boat.del(id, (err, result) => {
        if (err) {
            if (err.code === 'E_NOT_FOUND') next();
            else next(err)
        }
        else {
            res.status(204).json();
        }
    });
});

module.exports = router;