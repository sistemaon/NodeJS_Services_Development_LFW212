'use strict'

const { Readable } = require('stream')
async function* upper(res) {
  for await (const chunk of res) {
    yield chunk.toString().toUpperCase()
  }
}
module.exports = async function (fastify, opts) {
  fastify.get('/', function (request, reply) {
    setTimeout(() => {
        try {
            const { un } = request.query
            if (!un) {
              throw fastify.httpErrors.notFound();
            }
            if (Array.isArray(un)) {
                const singleUn = un[0];
                const uppercased = (singleUn || '').toUpperCase();
                reply.code(200).send(uppercased);
            } else {
                const uppercased = (un || '').toUpperCase();
                reply.code(200).send(uppercased);
            }
        } catch (err) {
            if (err.statusCode) {
                return reply.code(err.statusCode).send(err)
            }
            return reply.code(500).send(err)
        }
    }, 1000);
  });

  fastify.get('/proxy', async (request, reply) => {
    const { url } = request.query;
    try {
      new URL(url);
    } catch (error) {
      throw fastify.httpErrors.badRequest();
    }
    return reply.from(url, {
      onResponse(request, reply, res) {
        // reply.send(Readable.from(upper(res)))
        reply.send(Readable.from(res))
      }
    });
  })
}
