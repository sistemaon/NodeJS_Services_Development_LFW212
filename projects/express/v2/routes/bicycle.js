
const express = require('express');
const router = express.Router();
const bicycleModel = require('../models/bicycle')();

router.get('/:id', (req, res, next) => {
    bicycleModel.read(req.params.id, (err, result) => {
        if (err) {
            if (err.message === 'not found') next();
            else {
                res.status(500);
                return next(err);
            }
        } else {
            res.send(result);
        }
    });
});

router.post('/', (req, res, next) => {
    const id = bicycleModel.uid();
    bicycleModel.create(id, req.body.data, (err) => {
        if (err) next(err);
        else res.status(201).send({ id });
    });
});

router.post('/:id/update', (req, res, next) => {
    bicycleModel.update(req.params.id, req.body.data, (err) => {
        if (err) {
            if (err.message === 'not found') next();
            else next(err);
        } else {
            res.status(204).send();
        }
    });
});

router.put('/:id', (req, res, next) => {
    bicycleModel.create(req.params.id, req.body.data, (err) => {
        if (err) {
            if (err.message === 'resource exists') {
                bicycleModel.update(req.params.id, req.body.data, (err) => {
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

router.delete('/:id', (req, res, next) => {
    bicycleModel.del(req.params.id, (err) => {
        if (err) {
            if (err.message === 'not found') next();
            else next(err);
        } else {
            res.status(204).send();
        }
    });
});

module.exports = router;
