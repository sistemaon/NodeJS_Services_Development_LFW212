
const express = require('express');
const router = express.Router();
const bicycleModel = require('../models/bicycle');
const { body, param, query, check, validationResult } = require('express-validator');

router.get('/:id', param('id').notEmpty().isString(), query('tas').notEmpty().isNumeric().bail(), (req, res, next) => {
    const result = validationResult(req);
    console.log("🚀 ~ file: bicycle.js:9 ~ router.get ~ result:", result)

    if (result.errors.length > 0) {
        const arrErr = [];
        for (i = 0; i < result.array().length; i++) {
            const error = result.array()[i];
            console.log("🚀 ~ file: bicycle.js:14 ~ router.get ~ result.errors:", result.array())
            console.log("🚀 ~ file: bicycle.js:15 ~ router.get ~ error:", error)
            arrErr.push({ variable: error.path, message: error.msg });
        }
        console.log("🚀 ~ file: bicycle.js:18 ~ router.get ~ arrErr:", arrErr);
        return res.status(400).send(arrErr);
    }
    
    bicycleModel.bicycle.read(req.params.id, (err, result) => {
        if (err) {
            if (err.message === 'not found') next();
            else next(err);
        } else {
            res.send(result);
        }
    });
});

router.post('/', (req, res, next) => {
    var id = bicycleModel.bicycle.uid();
    bicycleModel.bicycle.create(id, body(req.body.data).isObject(), (err) => {
        if (err) next(err);
        else res.status(201).send({ id });
    });
});

router.post('/:id/update', (req, res, next) => {
    bicycleModel.bicycle.update(param(req.params.id).isObject(), req.body.data, (err) => {
        if (err) {
            if (err.message === 'not found') next();
            else next(err);
        } else {
            res.status(204).send();
        }
    });
});

router.put('/:id', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
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