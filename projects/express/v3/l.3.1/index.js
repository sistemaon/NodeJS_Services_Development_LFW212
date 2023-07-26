
const express = require('express');
const router = express.Router();

const data = require('./data');

router.get('/', async (req, res, next) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        const result = await data();
        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
