
const express = require('express');
const router = express.Router();
const finished = require('stream').finished;
const hnLatestStream = require('hn-latest-stream');

router.get('/', (req, res, next) => {

    const { amount = 10 } = req.query;

    const type = 'json';
    res.setHeader('Content-type', 'text/html');
    res.type('html');

    const hnStream = hnLatestStream( amount, type);

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
        const readableData = data.toString('utf8');
        const checkJson = checkJsonString(readableData);
        const articleJsonParse = JSON.parse(checkJson);
        articleJsonParse.title && articleJsonParse.url && articleJsonParse.by ? articles.push(articleJsonParse) : null;
    });

    try {
        finished(hnStream, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).render('articles', { title: 'ARTICLES', articles: articles });
        })
        
    } catch (error) {
        return next(error);
    }

});






module.exports = router;
