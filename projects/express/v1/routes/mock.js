
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const AbortController = require("abort-controller");

const {
    BICYCLE_SERVICE_PORT = 4040, BRAND_SERVICE_PORT = 5050
} = process.env;

const bicycleSrv = `http://localhost:${BICYCLE_SERVICE_PORT}`;
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`;

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    const controllerAbort = new AbortController();
    const fetchTimeout = setTimeout(() => { controllerAbort.abort }, 3000);
    try {
        const bicycle = await fetch(`${bicycleSrv}/${id}`, { signal: controllerAbort.signal });
        const bicycleResponse = await bicycle.json();
        clearTimeout(fetchTimeout);

        const brand = await fetch(`${brandSrv}/${id}`, { signal: controllerAbort.signal });
        const brandResponse = await brand.json();
        clearTimeout(fetchTimeout);

        return res.status(200).json({
            id: bicycleResponse.id,
            color: bicycleResponse.color,
            brand: brandResponse.name,
        })
    } catch (error) {
        clearTimeout(fetchTimeout);
        return res.status(400).json({ error: error });
    }
});

module.exports = router;