
const express = require('express');
const router = express.Router();
const model = require('../model');

router.post('/', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        const id = model.boat.uid();
        const { data } = req.body;
        model.boat.create(id, data, (err, result) => {
            if (err) {
                return err.message === 'resource exists' ? next() : next(err);
            }
            return res.status(201).send({ id: result });
        });
    } catch (error) {
        return next(error);
    }
});

router.get('/:id', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        const { id } = req.params;
        model.boat.read(id, (err, result) => {
            if (err) {
                return err.message === 'not found' ? next() : next(err);
            }
            return res.status(200).send(result)
        });
    } catch (error) {
        return next(error);
    }
});

router.delete('/:id', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        const { id } = req.params;
        model.boat.del(id, (err, result) => {
            if (err) {
                return err.message === 'not found' ? next() : next(err);
            }
            return res.status(204).send();
        });      
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
