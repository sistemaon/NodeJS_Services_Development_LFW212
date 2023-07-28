
const express = require('express');
const router = express.Router();
const model = require('../model');
const createHttpError = require('http-errors');

router.use((req, res, next) => {
    try {
        if (req.method !== 'GET') {
            return next(createHttpError(405));
        }
        return next();
    } catch (error) {
        return next(error);
    }
});
router.get('/:id', (req, res, next) => {
    try {
        const { id } = req.params;
        model.boat.read(id, (err, result) => {
            if (err) {
                if (err.message === 'not found') return next();
                else return next(err);
            }
            res.status(200).send(result);
        });      
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
