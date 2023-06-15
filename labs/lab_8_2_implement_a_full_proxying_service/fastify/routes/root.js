'use strict'

const { Readable } = require('stream')
const proxy = require('@fastify/http-proxy')


module.exports = async function (fastify, opts) {
  fastify.register(proxy, {
    upstream: 'https://jsonplaceholder.typicode.com'
  })

  fastify.get('/root', async function(request, reply) {
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
