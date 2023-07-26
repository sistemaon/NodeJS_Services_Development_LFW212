
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({ message: 'Ok' });        
    } catch (error) {
        return next(error);
    }
});

router.post('/', (req, res, next) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        res.status(405).send({ message: 'Method Not Allowed' });        
    } catch (error) {
        return next(error);
    }
});






module.exports = router;
