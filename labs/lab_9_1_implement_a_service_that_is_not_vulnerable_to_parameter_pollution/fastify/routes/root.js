'use strict'

const valueUpper = (value) => Array.isArray(value) ? value.map(element => element.toString().toUpperCase()) : value.toUpperCase()

module.exports = async function (fastify, opts) {
  const { notFound } = fastify.httpErrors

  fastify.get('/root', async function (request, reply) {
    return { root: true }
  })

  fastify.get('/', (request, reply) => {
    setTimeout(() => {
      try {
        const { un } = request.query
        if (!un) {
          throw notFound()
        }
        const result = valueUpper(un);
        return reply.code(200).send(result);
      } catch (err) {
        if (err.statusCode) {
          return reply.code(err.statusCode).send(err)
        }
        return reply.code(500).send(err)
      }
    }, 1000)
  })
}
