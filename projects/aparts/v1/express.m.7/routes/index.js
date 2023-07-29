const express = require('express');
const createHttpError = require('http-errors');
const router = express.Router();

const {
  BICYCLE_SERVICE_PORT = 4040, BRAND_SERVICE_PORT = 5050
} = process.env

const bicycleSrv = `http://localhost:${BICYCLE_SERVICE_PORT}`;
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`;

// router.get('/:id', async (req, res, next) => {
//   res.setHeader('Content-Type', 'application/json');
//   try {
//     const { id } = req.params;
//     const bicycleResponse = await fetch(`${bicycleSrv}/${id}`);
//     const responseJson = await bicycleResponse.json();
//     return res.status(200).send(responseJson);
//   } catch (error) {
//     return next(error);
//   }
// });

// router.get('/:id', async (req, res, next) => {
//   res.setHeader('Content-Type', 'application/json');
//   try {
//     const { id } = req.params;
//     const bicycleResponse = await fetch(`${bicycleSrv}/${id}`);
//     const bicycleResponseJson = await bicycleResponse.json();
//     const brandResponse = await fetch(`${brandSrv}/${id}`);
//     const brandResponseJson = await brandResponse.json();
//     return res.status(200).send({
//       id: bicycleResponseJson.id,
//       color: bicycleResponseJson.color,
//       brand: brandResponseJson.name
//     });
//   } catch (error) {
//     return next(error);
//   }
// });

router.get('/:id', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
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

module.exports = router;
