
const fastify = require('fastify')({ logger: true });
const dataLib = require('./data');

const PORT = 3000;
const HOST = 'localhost';
const URI = `http://${HOST}:${PORT}`;

fastify.get('/', async (req, res) => {
    const result = await dataLib();
    res.header('Content-Type', 'application/json');
    return res.status(200).send(result);
});

fastify.get('*', (req, res) => {
    res.header('Content-Type', 'application/json');
    return res.status(404).send(JSON.stringify({ error: 'Not found' }));
});

const start = async () => {
    try {
        await fastify.listen({ port: PORT })
        console.log(`Server running at ${URI}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();