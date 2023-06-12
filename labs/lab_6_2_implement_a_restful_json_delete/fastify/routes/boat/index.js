'use strict'

const { promisify } = require('util')
const { boat } = require('../../model')
const read = promisify(boat.read)
const create = promisify(boat.create)
const del = promisify(boat.del)

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

  fastify.delete('/:id', async (request, reply) => {
    const id = request.params.id
    try {
      await del(id)
      reply.code(204)
      return
    } catch (err) {
      if (err.code === 'E_NOT_FOUND') throw notFound()
      throw err
    }
  })
}