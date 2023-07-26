
const express = require('express');
const router = express.Router();

router.get('/hello', (req, res, next) => {
    const greet = 'greeting' in req.query ? req.query.greeting : 'Hello';
    res.status(200).render( 'hello', { title: 'GREET', greeting: greet } );
});

module.exports = router;
