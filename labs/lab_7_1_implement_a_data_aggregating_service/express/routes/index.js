
const express = require('express');
const router = express.Router();
const sendRequest = require('../utils/sendRequest');

const {
  BOAT_SERVICE_PORT = 3333, BRAND_SERVICE_PORT = 3334
} = process.env;

const boatService = `http://localhost:${BOAT_SERVICE_PORT}`;
const brandService = `http://localhost:${BRAND_SERVICE_PORT}`;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:id', async function (req, res, next) {
  const { id } = req.params;
  try {
      const timeout = 1250;
      const boat = await sendRequest(`${boatService}/${id}`, timeout);
      const brand = await sendRequest(`${brandService}/${boat?.brand}`, timeout);
      return res.status(200).json({
          id: boat.id,
          color: boat.color,
          brand: brand.name
      });
  } catch (err) {
      if (err.statusCode === 404) {
          return res.status(404).json({ message: "Not Found!" });
      }
      if (err.statusCode === 400) {
          return res.status(400).json({ message: "Bad Request!" });
      }
      return next(err);
  }
});

module.exports = router;