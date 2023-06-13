'use strict'

const got = require('got')

const {
  BICYCLE_SERVICE_PORT = 4000, BRAND_SERVICE_PORT = 5000
} = process.env

const bicycleService = `http://localhost:${BICYCLE_SERVICE_PORT}`
const brandService = `http://localhost:${BRAND_SERVICE_PORT}`

module.exports = async function (fastify, opts) {
  const { httpErrors } = fastify
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      const [ bicycle, brand ] = await Promise.all([
        got(`${bicycleService}/${id}`).json(),
        got(`${brandService}/${id}`).json()
      ])
      return {
        id: bicycle.id,
        color: bicycle.color,
        brand: brand.name,
      }
    } catch (err) {
      if (!err.response) throw err
      if (err.response.statusCode === 404) {
        throw httpErrors.notFound()
      }
      if (err.response.statusCode === 400) {
        throw httpErrors.badRequest()
      }
      if (err.response.statusCode >= 300 && err.response.statusCode <= 399) {
        const redirectURL = request.hostname;
        return reply.redirect(`http://${redirectURL}/retry`)
      }
      throw err
    }
  })

  const retry = `<html>
    <head>
      <style>
      body { background: #333; margin: 1.25rem }
      h1 { color: #EEE; font-family: sans-serif }
      </style>
    </head>
    <body>
      <h1>Try Again Later.</h1>
      <p>Invalid request. Please try again.</p>
    </body>
  </html>`

  fastify.get('/retry', async function (request, reply) {
    reply.type('text/html')
    return retry
  })

}