
const { promisify } = require('util');
const { boat } = require('../../boatModel');
const { uid } = boat;
const create = promisify(boat.create);
const read = promisify(boat.read);

module.exports = async (fastify, opts) => {
    const { notFound, internalServerError } = fastify.httpErrors;

    const dataSchema = {
        type: 'object',
        required: ['brand', 'color'],
        additionalProperties: false,
        properties: {
            brand: { type: 'string' },
            color: { type: 'string' }
        }
    };
    const bodySchema = {
        type: 'object',
        required: ['data'],
        additionalProperties: false,
        properties: {
            data: dataSchema
        }
    };
    const idSchema = { type: 'string' };
    const paramsSchema = { id: idSchema };

    fastify.get('/:id', {
        schema: {
            params: paramsSchema,
            response: {
                200: dataSchema
            }
        }
    }, 
    async (request, reply) => {
        const { id } = request.params;
        try {
            reply.code(200);
            return await read(id);
        } catch (error) {
            if (error.message === 'not found') throw notFound;
            throw error;
        }
    });

    fastify.post('/', {
        schema: {
            body: bodySchema,
            response: {
                201: paramsSchema
            }
        }
    },
    async (request, reply) => {
        reply.type('application/json');
        try {
            const { data } = request.body;
            const id = uid();
            await create(id, data);
            reply.code(201);
            return { id };
        } catch (error) {
            reply.code(500);
            throw internalServerError;
        }
    });

};