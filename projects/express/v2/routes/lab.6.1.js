
const express = require('express');
const router = express.Router();
const model = require('../models/lab.6.1.model');

router.get('/:id', (req, res, next) => {
    res.setHeader('content-type', 'application/json');

    model.boat.read(req.params.id, (err, result) => {
        if (err) {
            err && err.message === 'not found' ? next() : next(err);
        } else {
            res.send(result);
        }
    });
});

router.post('/', (req, res, next) => {
    res.setHeader('content-type', 'application/json');

    const id = model.boat.uid();
    const { brand, color } = req.body.data;

    try {
        model.boat.create(id, { brand, color}, (err) => {

            if (err) {
                return err.message === 'resource exists' ? next() : next(err);
            }
            return res.status(201).send({ id: id });

        });
    } catch (error) {
        res.status(500)
        return next(error);
    }

});

router.delete('/:id', (req, res, next) => {
    res.setHeader('content-type', 'application/json');
    model.boat.del(req.params.id, (err) => {
        if (err) {
            return err.message === 'not found' ? next() : next(err);
        }
        return res.status(204).send();
    });
});

module.exports = router;