
const express = require('express');
const router = express.Router();
const dataBytes = require('../3.1.data');

router.get('/', async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    const data = await dataBytes();
    return res.status(200).send(data);
});

module.exports = router;