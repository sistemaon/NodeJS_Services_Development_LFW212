
const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const BICYCLE_SERVICE_PORT = process.env.BICYCLE_SERVICE_PORT || 4040;
const BRAND_SERVICE_PORT = process.env.BRAND_SERVICE_PORT || 5050;

const bicycleSrv = `http://localhost:${BICYCLE_SERVICE_PORT}`;
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`;


router.get('/:id', async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    const { id } = req.params;
    const noop = Function.prototype;
    const signal = AbortSignal.timeout(3000);
    const bicycleReq = await fetch(`${bicycleSrv}/${id}`, { signal });
    const brandReq = await fetch(`${brandSrv}/${id}`, { signal });
    if (bicycleReq.status === 404 || brandReq.status === 404) {
        return next(createError(404));
    }
    if (bicycleReq.status === 400 || brandReq.status === 400) {
        return next(createError(400));
    }
    const bicycleJsonPromise = bicycleReq.json();
    const brandJsonPromise = brandReq.json();
    bicycleJsonPromise.catch(noop);
    brandJsonPromise.catch(noop);
    const results = await Promise.allSettled([bicycleJsonPromise, brandJsonPromise]);
    for (const { reason } of results) if (reason) throw reason;
    const [bicycle, brand] = results.map(({ value }) => value);
    return res.status(200).json({
        id: bicycle.id,
        color: bicycle.color,
        brand: brand.name
    });
});

module.exports = router;
