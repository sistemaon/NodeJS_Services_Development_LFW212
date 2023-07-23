
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const http = require('http');
const { Readable } = require('stream');

const BICYCLE_SERVICE_PORT = process.env.BICYCLE_SERVICE_PORT || 4040;
const BRAND_SERVICE_PORT = process.env.BRAND_SERVICE_PORT || 5050;

const bicycleSrv = `http://localhost:${BICYCLE_SERVICE_PORT}`;
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`;

// const upper = 
// };

// const proxyMiddleware = (url) => createProxyMiddleware({
//     target: url, // Use a function to get the dynamic target URL
//     onProxyRes: function (proxyRes, req, res) {
//         // Manipulate the response here
//         const chunks = [];
//         proxyRes.on('data', (chunk) => chunks.push(chunk));
//         proxyRes.on('end', () => {
//             const body = Buffer.concat(chunks).toString();
//             const transformedBody = upper(body); // Apply your 'upper' function here
//             return transformedBody;
//         });
//     }
// });

const customProxyMiddleware = (req, res, next) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).send('Missing "url" parameter in query');
    }
    // const proxyResBody = [];
    // const proxy = createProxyMiddleware({
    //     target: url,
    //     onProxyRes: function (proxyRes, req, res) {
    //         // Manipulate the response here
    //         const chunks = [];
    //         proxyRes.on('data', (chunk) => chunks.push(chunk));
    //         proxyRes.on('end', () => {
    //             const body = Buffer.concat(chunks).toString();
    //             console.log("🚀 ~ file: root.js:44 ~ proxyRes.on ~ body:", body)
    //             // res.transformedBody = body;
    //             // next(res.transformedBody);
    //         });
    //     },
    // });
    // // Call the proxy middleware
    // // return proxy(req, res, next);
    // proxy(req, res, next);
}

const upper = async function* (res) {
    for await (const chunk of res) {
        yield chunk.toString().toUpperCase()
    }
};

router.get('/', (req, res, next) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).send('Missing "url" parameter in query');
    }
    http
    .get(url, (response) => {
      const contentType = 'application/json';
      const cookieType = 'test';
      res.setHeader('content-type', contentType);
      res.setHeader('cookie', cookieType);
      if (response.statusCode === 404) {
        return res.status(404).json('Not Found!');
      }
      if (response.statusCode === 400) {
        return res.status(400).json('Bad Request!');
      }
      if (response.statusCode === 301) {
        return res.status(301).json('Moved Permanently!');
      }
      response.setEncoding('utf8');
      const transformedData = Readable.from(upper(response));
      transformedData.pipe(res);
    })
    .on('error', (err) => {
      if (err.code === 'ERR_INVALID_URL') {
        return res.status(404).json('Bad Request!');
      }
      return res.status(400).json('Not Found!');
    });
});


// router.get('/', async (req, res, next) => {
//     const { url } = req.query;
//     try {
//         new URL(url)
//     } catch (err) {
//         next(err);
//     }
//     const proxy = createProxyMiddleware({
//         target: url, // Replace with the actual target URL
//         onProxyRes: function (proxyRes, req, res) {
//             // Manipulate the response here
//             const chunks = [];
//             proxyRes.on('data', (chunk) => chunks.push(chunk));
//             proxyRes.on('end', () => {
//                 const body = Buffer.concat(chunks).toString();
//                 const transformedBody = upper(body); // Apply your 'upper' function here
//                 return transformedBody;
//             });
//         },
//     });
//     console.log("🚀 ~ file: root.js:54 ~ router.get ~ proxy:", {proxy})
//     return res.status(200).json( proxy );
// })


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
