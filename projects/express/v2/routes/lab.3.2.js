
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    return res.status(200).send('Ok!');
});

router.post('/', (req, res, next) => {
    return res.status(405).send('Method Not Allowed!');
});

module.exports = router;