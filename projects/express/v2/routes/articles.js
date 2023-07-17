
const express = require('express');
const router = express.Router();
const hnLatestStream = require('hn-latest-stream');
const finished = require('stream/promises').finished;

router.get('/', async (req, res, next) => {
    const { amount = 10, type = 'html' } = req.query;

    if (type === 'html') res.type('html');
    if (type === 'json') res.type('json');

    const hnStream = hnLatestStream(amount, type);
    hnStream.pipe(res, { end: false });

    try {
        await finished(hnStream);
        return res.end();
    } catch (error) {
        return next(error);
    }

});

router.get('/me', async (req, res, next) => {
    const { amount = 10 } = req.query;

    const type = 'json';
    res.type('html');

    const hnStream = hnLatestStream(amount, type);

    const checkJsonString = (string) => {
        const firstCharacter = string[0];
        const hasOpeningBrace = string.includes('{');
        const hasClosingBrace = string.includes('}');
        if (!hasOpeningBrace || !hasClosingBrace) {
            return false;
        }
        if (firstCharacter === ',') {
            string = string.slice(1);
        }
        return string;
    };

    const articles = [];
    hnStream.on('data', (data) => {
        const readableResult = data.toString('utf8');
        const checkJson = checkJsonString(readableResult);
        const article = JSON.parse(checkJson);
        article.title && article.url && article.by ? articles.push(article) : null;
    });

    try {
        await finished(hnStream);
        return res.render('articles', { title: 'Articles', articles: articles });
    } catch (error) {
        return next(error);
    }

});

module.exports = router;