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

---

# Proxying HTTP Requests

>**files**: _routes/root.js_, _app.js_\
>**route path**: _/_, _/yproxy/_\
>**query**: _token_\
>**example**: _/yproxy?token=123_

>**files**: _app.js_\
>**route path**: _/_, _/jproxy/_\
>**example**: _/jproxy/todos/1_
>
>**run command**: _node 8.1.validate.js_
>
>**Objective**:
> - Correct header set content-type to application/json
> - Respond to GET with status '200' OK
> - Respond to GET with status '301' MOVED PERMANENTLY
> - Respond to GET with status '400' BAD REQUEST
> - Respond to GET with status '404' NOT FOUND

---
---
