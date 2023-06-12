'use strict'

const { promisify } = require('util')
const { boat } = require('../../model')
const read = promisify(boat.read)
const create = promisify(boat.create)

module.exports = async (fastify, opts) => {
  const { notFound } = fastify.httpErrors

  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params
    try {
      return await read(id)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

  fastify.post('/', async (request, reply) => {
    const id = boat.uid()
    try {
      const result = await create(id, request.body.data)
      reply.code(201)
      return { id: result }
    } catch (err) {
      throw err
    }
  })
}