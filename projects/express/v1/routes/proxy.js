const express = require('express');
const router = express.Router();
const { createProxyMiddleware } = require('http-proxy-middleware');

const authMiddleware = (req, res, next) => {
    if (req.query.token !== 'abc') {
        return res.status(401).json({ message: 'Unauthorized!' });
    }
    next();
};

router.use(
    authMiddleware,
    createProxyMiddleware({
        target: 'https://news.ycombinator.com',
        changeOrigin: true
    })
);

module.exports = router;
