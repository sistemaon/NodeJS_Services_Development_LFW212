'use strict'

const { promisify } = require('util');
const { boat } = require('../../model');
const { uid } = boat;
const create = promisify(boat.create);
const read = promisify(boat.read);
const del = promisify(boat.del);

module.exports = async function (fastify, opts) {

    const { notFound, internalServerError } = fastify.httpErrors;

    const dataSchema = {
        type: 'object',
        required: ['brand', 'color'],
        additionalProperties: false,
        properties: {
            brand: { type: 'string' },
            color: { type: 'string' }
        }
    }
    const bodySchema = {
        type: 'object',
        required: ['data'],
        additionalProperties: false,
        properties: {
            data: dataSchema
        }
    }

    const idSchema = { type: 'string' }
    const paramsSchema = { id: idSchema }

    fastify.post('/', {
        schema: {
            body: bodySchema,
            response: {
                201: {
                    id: idSchema
                }
            }
        }
    }, 
    async function (request, reply) {
        try {
            const { data } = request.body;
            const id = uid();
            await create(id, data);
            reply.code(201);
            return reply.send({ id });    
        } catch (error) {
            throw internalServerError();
        }
    });

    fastify.get('/:id', {
        schema: {
            params: paramsSchema,
            response: {
                200: dataSchema
            }
        }
    }, 
    async function (request, reply) {
        try {
            const { id } = request.params;
            const data = await read(id);
            reply.code(200);
            return reply.send(data);    
        } catch (error) {
            throw notFound();
        }
    });

    fastify.delete('/:id', {
        schema: {
            params: paramsSchema
        }
    }, 
    async function (request, reply) {
        try {
            const { id } = request.params;
            await del(id);
            reply.code(204);
            return;
        } catch (error) {
            throw notFound();
        }
    });
}
