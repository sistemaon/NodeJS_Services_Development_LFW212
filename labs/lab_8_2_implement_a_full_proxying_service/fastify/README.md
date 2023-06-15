# NodeJS_Services_Development_LFW212

## Lab

### Lab 8.2 - Implement a Full Proxying Service

### Node Fastify Server

#### Install:
```
npm install
```

#### Run:
```
npm start
```

#### Validate the Implementation:
```
node -e "http.get('http://localhost:3000/todos/1', (res) =>res.pipe(process.stdout))"
```
- The output of implement's validation should be somehow something similar to this:
```json
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```

# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)
This project was bootstrapped with Fastify-CLI.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).