
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    const greeting = 'greeting' in req.query ?
        req.query.greeting :
        'Hello';
    res.render('hello', { greeting: greeting });
});

router.get('/hi', (req, res, next) => {
    const hello = `
        <html>
            <head>
                <style>
                    body { background: #333; margin: 1.25rem }
                    a { color: yellow; font-size: 2rem; font-family: sans-serif }
                </style>
            </head>
            <body>
                <a href='/hello/world'>Hello</a>
            </body>
        </html>
    `
    res.send(hello);
});

router.get('/world', (req, res, next) => {
    const world = `
        <html>
            <head>
                <style>
                    body { background: #333; margin: 1.25rem }
                    h1 { color: #EEE; font-family: sans-serif }
                </style>
            </head>
            <body>
                <h1>Hello World</h1>
            </body>
        </html>
    `
    res.send(world);
});

module.exports = router;