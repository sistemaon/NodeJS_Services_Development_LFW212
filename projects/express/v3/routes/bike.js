
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

router.post('/', function (req, res, next) {
    var id = model.bicycle.uid();
    model.bicycle.create(id, req.body.data, (err) => {
        if (err) next(err);
        else res.status(201).send({ id });
    });
});

router.post('/:id/update', function (req, res, next) {
    model.bicycle.update(req.params.id, req.body.data, (err) => {
        if (err) {
            if (err.message === 'not found') next();
            else next(err);
        } else {
            res.status(204).send();
        }
    });
});

router.put('/:id', function (req, res, next) {
    model.bicycle.create(req.params.id, req.body.data, (err) => {
        if (err) {
            if (err.message === 'resource exists') {
                model.bicycle.update(req.params.id, req.body.data, (err) => {
                    if (err) next(err);
                    else res.status(204).send();
                });
            } else {
                next(err);
            }
        } else {
            res.status(201).send({});
        }
    });
});

router.delete('/:id', function (req, res, next) {
    model.bicycle.del(req.params.id, (err) => {
        if (err) {
            if (err.message === 'not found') next();
            else next(err);
        } else {
            res.status(204).send();
        }
    });
});

module.exports = router;
