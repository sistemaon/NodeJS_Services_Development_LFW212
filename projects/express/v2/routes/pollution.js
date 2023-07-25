
const express = require('express');
const router = express.Router();
const createError = require('http-errors');

router.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    const { un } = req.query;
    if (!un) return next(createError(404));
    try {
        setTimeout(() => {
            if (Array.isArray(un)) {
                const singleUn = un[0];
                const uppercased = (singleUn || '').toUpperCase();
                return res.status(200).send(uppercased);
            } else {
                return res.status(200).send((un || '').toUpperCase());
            }
        }, 1000);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
