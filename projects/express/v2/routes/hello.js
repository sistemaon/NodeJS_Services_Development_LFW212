
const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    const greeting = 'greeting' in req.query ?
    req.query.greeting :
    'Hello';
    res.render('helloWorldDummy01', { greeting: greeting });
});

module.exports = router;