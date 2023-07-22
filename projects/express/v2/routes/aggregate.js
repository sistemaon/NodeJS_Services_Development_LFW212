
const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const {
    BOAT_SERVICE_PORT = 3333, BRAND_SERVICE_PORT = 3334
} = process.env;

router.get('/:id', async (req, res, next) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        const { id } = req.params;
        const boatServer = `http://localhost:${BOAT_SERVICE_PORT}`;
        const brandServer = `http://localhost:${BRAND_SERVICE_PORT}`;
        const noop = Function.prototype;
        const signal = AbortSignal.timeout(1250);

        const boatReq = await fetch(`${boatServer}/${id}`, { signal });
        const boatJsonPromise = boatReq.json();
        boatJsonPromise.catch(noop);
        const boatResult = await Promise.allSettled([boatJsonPromise]);
        for (const { boatReason } of boatResult) if (boatReason) throw boatReason;
        const [boat] = boatResult.map(({ value }) => value);

        const brandReq = await fetch(`${brandServer}/${boat?.brand}`, { signal });

        if (boatReq.status === 500 || brandReq.status === 500) {
            return next(createError(400));
        }
        if (boatReq.status === 404 || brandReq.status === 404) {
            return next(createError(404));
        }
        if (boatReq.status === 400 || brandReq.status === 400) {
            return next(createError(400));
        }
        if (boatReq.status > 400 && boatReq.status < 500 || brandReq.status > 400 && brandReq.status < 500) {
            return next(createError(500));
        }

        const brandJsonPromise = brandReq.json();
        brandJsonPromise.catch(noop);
        const brandResult = await Promise.allSettled([brandJsonPromise]);
        for (const { brandReason } of brandResult) if (brandReason) throw brandReason;
        const [brand] = brandResult.map(({ value }) => value);

        return res.status(200).json({
            id: boat.id,
            color: boat.color,
            brand: brand.name
        });
    } catch (error) {
        return next(error);
    }
});

// router.get('/:id', async (req, res, next) => {
//     res.setHeader('Content-Type', 'application/json');
//     const boatServer = `http://localhost:${BOAT_SERVICE_PORT}`;
//     const brandServer = `http://localhost:${BRAND_SERVICE_PORT}`;
//     const { id } = req.params;
//     const noop = Function.prototype;
//     const signal = AbortSignal.timeout(1250);

//     const boatReq = await fetch(`${boatServer}/${id}`, { signal });
//     const boatJsonPromise = boatReq.json();
//     boatJsonPromise.catch(noop);
//     const boatResult = await Promise.allSettled([boatJsonPromise]);

//     for (const { boatReason } of boatResult) if (boatReason) throw boatReason;
//     const [boat] = boatResult.map(({ value }) => value);
//     const boatId = boat?.id;

//     if (!boatId) return next(createError(404));

//     const brandReq = await fetch(`${brandServer}/${boatId}`, { signal });
//     const brandJsonPromise = brandReq.json();
//     const brandResult = await Promise.allSettled([brandJsonPromise]);

//     for (const { brandReason } of brandResult) if (brandReason) throw brandReason;
//     const [brand] = brandResult.map(({ value }) => value);
//     const brandName = brand?.name;

//     if (!brandName) return next(createError(404));

//     if (boatReq.status === 404 || brandReq.status === 404) {
//         return next(createError(404));
//     }
//     if (boatReq.status === 400 || brandReq.status === 400) {
//         return next(createError(400));
//     }
//     if (boatReq.status === 500 || brandReq.status === 500) {
//         return next(createError(400));
//     }
//     if (boatReq.status > 400 && boatReq.status < 500 || brandReq.status > 400 && brandReq.status < 500) {
//         return next(createError(500));
//     }

//     return res.status(200).json({ id: boatId, color: boat.color, brand: brandName });
// });

module.exports = router;
