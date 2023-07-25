'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const proxy = require('@fastify/http-proxy');

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // node -e "http.get('http://localhost:3000/jproxy/todos/1',(res)=>res.pipe(process.stdout))"
  fastify.register(proxy, {
    upstream: 'https://jsonplaceholder.typicode.com/',
    prefix: '/jproxy'
  });

  fastify.register(proxy, {
    upstream: 'https://news.ycombinator.com/',
    prefix: '/yproxy',
    async preHandler (request, reply) {
      if(!request.query.token) {
        throw fastify.httpErrors.unauthorized();
      }
    }
  });

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
