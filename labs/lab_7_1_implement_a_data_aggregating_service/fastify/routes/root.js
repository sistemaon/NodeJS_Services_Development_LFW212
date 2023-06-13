'use strict'

const sendRequest = require('../utils/sendRequest');

const {
  BOAT_SERVICE_PORT = 3333, BRAND_SERVICE_PORT = 3334
} = process.env;

const boatService = `http://localhost:${BOAT_SERVICE_PORT}`;
const brandService = `http://localhost:${BRAND_SERVICE_PORT}`;

module.exports = async function (fastify, opts) {
  const { httpErrors } = fastify
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      const timeout = 1250;
      const boat = await sendRequest(`${boatService}/${id}`, timeout);
      const brand = await sendRequest(`${brandService}/${boat?.brand}`, timeout);
      return {
        id: boat.id,
        color: boat.color,
        brand: brand.name
      }
    } catch (err) {
      if (err.statusCode === 404) {
        throw httpErrors.notFound()
      }
      if (err.statusCode === 400) {
        throw httpErrors.badRequest()
      }
      throw err
    }
  })

  fastify.get('/', async function (request, reply) {
    return { root: true }
  })
}
