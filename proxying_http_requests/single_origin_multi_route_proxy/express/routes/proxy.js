
const express = require('express');
const router = express.Router();
const { createProxyMiddleware } = require('http-proxy-middleware');

router.use(
    createProxyMiddleware({
        target: 'https://news.ycombinator.com',
        changeOrigin: true,
        pathFilter: '/'
    })
);

module.exports = router;