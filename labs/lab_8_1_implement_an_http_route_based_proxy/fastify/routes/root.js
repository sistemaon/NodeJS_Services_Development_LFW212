'use strict'

const { Readable } = require('stream')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function(request, reply) {
    const { url } = request.query
    try {
      new URL(url)
    } catch (err) {
      throw fastify.httpErrors.badRequest()
    }
    return reply.from(url, {
      onResponse(request, reply, res) {
        reply.send(Readable.from(res))
      }
    })
  })
}
