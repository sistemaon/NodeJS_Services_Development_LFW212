
const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const { BOAT_SERVICE_PORT, BRAND_SERVICE_PORT } = process.env;

router.get('/:id' , async (req, res, next) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        const { id } = req.params;
        const boatServer = `http://localhost:${BOAT_SERVICE_PORT}`;
        const brandServer = `http://localhost:${BRAND_SERVICE_PORT}`;
        const noop = Function.prototype;
        const abortSingnal = AbortSignal.timeout(1250);

        const boatReq = await fetch(`${boatServer}/${id}`, { abortSingnal });
        const reqStatus4xx = [401, 402, 403, 405]
        if (boatReq.status === 404) {
            return next(createError(boatReq.status))
        }
        if (boatReq.status === 500) {
            return next(createError(boatReq.status))
        }
        if (boatReq.status === 400) {
            return next(createError(boatReq.status))
        }
        if (reqStatus4xx.includes(boatReq.status) || boatReq.status > 405 && boatReq.status <= 499) {
            return next(createError(boatReq.status))
        }
        const boatJsonPromise = boatReq.json();
        boatJsonPromise.catch(noop);
        const boatResult = await Promise.allSettled([boatJsonPromise]);
        for (const { boatReason } of boatResult) if (boatReason) throw boatReason;
        const [boat] = boatResult.map( ({ value }) => value);

        const brandReq = await fetch(`${brandServer}/${boat?.brand}`, { abortSingnal });
        if (brandReq.status === 404) {
            return next(createError(brandReq.status))
        }
        if (brandReq.status === 500) {
            return next(createError(brandReq.status))
        }
        if (brandReq.status === 400) {
            return next(createError(brandReq.status))
        }
        if (reqStatus4xx.includes(brandReq.status) || brandReq.status > 405 && brandReq.status <= 499) {
            return next(createError(brandReq.status))
        }
        const brandJsonPromise = brandReq.json();
        brandJsonPromise.catch(noop);
        const brandResult = await Promise.allSettled([brandJsonPromise]);
        for (const { brandReason } of brandResult) if (brandReason) throw brandReason;
        const [brand] = brandResult.map( ({ value }) => value);

        return res.status(200).send({
            id: boat.id,
            color: boat.color,
            brand: brand.name
        });
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
