
const express = require('express');
const router = express.Router();
const hnLatestStream = require('hn-latest-stream');
const finished = require('stream').finished;

router.get('/', (req, res, next) => {
    try {
        const { amount = 10 } = req.query;
        const type = 'json';
        res.type('html');
        res.setHeader('Content-Type', 'text/html');

        const hnStream = hnLatestStream(amount, type);
        // hnStream.pipe(res, { end: false });


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
            const dataJson = checkJsonString(readableData);
            const dataParse = JSON.parse(dataJson);
            dataParse.title && dataParse.url && dataParse.by ? articles.push(dataParse) : null;
        });

        try {
            finished(hnStream, (err) => {
                if (err) return next(err);
                res.render('articles', { title: 'ARTICLES', articles: articles });
            });
        } catch (error) {
            return next(error);
        }
        
    } catch (error) {
        return next(error);
    }

});



module.exports = router;
