'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const proxy = require('@fastify/http-proxy');

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(proxy, {
    upstream: 'https://news.ycombinator.com/',
    prefix: '/yproxy/',
    async preHandler(request, reply) {
      const { token } = request.query;
      if (!token) {
        throw fastify.httpErrors.unauthorized();
      }
    }
  })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
