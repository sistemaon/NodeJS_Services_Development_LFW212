
const express = require('express');
const router = express.Router();
const model = require('./model');

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
    res.type('json');
    res.setHeader('Content-Type', 'application/json');
    try {
        const id = model.boat.uid();
        const { brand, color } = req.body.data;

        model.boat.create(id, { brand, color }, (err, result) => {
            if(err) {
                return err.message === 'resource exists' ? next() : next(err);
            }
            return res.status(201).send({ id: id });
        });
        
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
