
const express = require('express');
const router = express.Router();
const got = require('got');

const {
    BICYCLE_SERVICE_PORT = 4000, BRAND_SERVICE_PORT = 5000
} = process.env;

const bicycleService = `http://localhost:${BICYCLE_SERVICE_PORT}`;
const brandService = `http://localhost:${BRAND_SERVICE_PORT}`;

router.get('/:id', async function (req, res, next) {
    const { id } = req.params;
    try {
        const [bicycle, brand] = await Promise.all([
            got(`${bicycleService}/${id}`).json(),
            got(`${brandService}/${id}`).json()
        ]);
        return res.status(200).json({
            id: bicycle.id,
            color: bicycle.color,
            brand: brand.name,
        });
    } catch (err) {
        if (err.response.statusCode === 404) {
            return res.status(404).json({ message: "Not Found!" });
        }
        if (err.response.statusCode === 400) {
            return res.status(400).json({ message: "Bad Request!" });
        }
        if (err.response.statusCode >= 300 && err.response.statusCode <= 399) {
            return res.redirect('/retry');
        }
        return next(err);
    }
});

module.exports = router;