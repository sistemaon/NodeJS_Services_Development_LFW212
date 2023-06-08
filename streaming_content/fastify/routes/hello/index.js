'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async (request, reply) => {
    const { greeting = 'Hello there '} = request.query
    return reply.view(`hello.hbs`, { greeting })
  })
}