'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/root', async function (request, reply) {
    return { root: true }
  })
}
