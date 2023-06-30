
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

router.post('/', function (req, res, next) {
    var id = bicycleModel.bicycle.uid();
    bicycleModel.bicycle.create(id, req.body.data, (err) => {
        if (err) next(err);
        else res.status(201).send({ id });
    });
});

router.post('/:id/update', function (req, res, next) {
    bicycleModel.bicycle.update(req.params.id, req.body.data, (err) => {
        if (err) {
            if (err.message === 'not found') next();
            else next(err);
        } else {
            res.status(204).send();
        }
    });
});

router.put('/:id', function (req, res, next) {
    bicycleModel.bicycle.create(req.params.id, req.body.data, (err) => {
        if (err) {
            if (err.message === 'resource exists') {
                bicycleModel.bicycle.update(req.params.id, req.body.data, (err) => {
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
    bicycleModel.bicycle.del(req.params.id, (err) => {
        if (err) {
            if (err.message === 'not found') next();
            else next(err);
        } else {
            res.status(204).send();
        }
    });
});

module.exports = router;