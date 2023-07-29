const express = require('express');
const createHttpError = require('http-errors');
const router = express.Router();

const BOAT_SERVICE_PORT = process.env.BOAT_SERVICE_PORT || 3333
const BRAND_SERVICE_PORT = process.env.BRAND_SERVICE_PORT || 3334;

const boatServer = `http://localhost:${BOAT_SERVICE_PORT}`;
const brandServer = `http://localhost:${BRAND_SERVICE_PORT}`;

router.get('/:id', async (req, res, next) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const { id } = req.params;
    const noop = Function.prototype;
    const signal = AbortSignal.timeout(1250);

    const boatResponse = await fetch(`${boatServer}/${id}`, { signal });
    if (boatResponse.status === 400) {
      return next(createHttpError(400));
    }
    if (boatResponse.status === 404) {
      return next(createHttpError(404));
    }
    if ([401, 402, 403].includes(boatResponse.status) || boatResponse.status >= 405 && boatResponse.status <= 500) {
      return next(createHttpError(boatResponse.status));
    }
    const boatResponseJson = boatResponse.json();
    boatResponseJson.catch(noop);
    const boatResponseJsonResult = await Promise.allSettled([boatResponseJson]);
    for (const { reason } of boatResponseJsonResult) if (reason) return next(reason);
    const [ boat ] = boatResponseJsonResult.map( ({ value }) => value );

    const brandResponse = await fetch(`${brandServer}/${boat?.brand}`, { signal });
    if (brandResponse.status === 400) {
      return next(createHttpError(400));
    }
    if (brandResponse.status === 404) {
      return next(createHttpError(404));
    }
    if ([401, 402, 403].includes(brandResponse.status) || brandResponse.status >= 405 && brandResponse.status <= 500) {
      return next(createHttpError(brandResponse.status));
    }
    const brandResponseJson = brandResponse.json();
    brandResponseJson.catch(noop);
    const brandResponseJsonResult = await Promise.allSettled([brandResponseJson]);
    for (const { reason } of brandResponseJsonResult) if (reason) return next(reason);
    const [ brand ] = brandResponseJsonResult.map( ({ value }) => value );

    return res.status(200).send({
      id: boat?.id,
      color: boat?.color,
      brand: brand?.name
    });

  } catch (error) {
    return next(error);
  }
});

module.exports = router;
