'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  fastify.addHook('onRequest', async function (request) {
    const ips = ['::1', '127.0.0.1'];
    if (ips.includes(request.ip)) {
      const err = new Error('Forbidden')
      err.status = 403
      throw err
    }
  })
})