# NodeJS Services Development LFW212

---
---

## 01. Introduction

> Preparatory for [OpenJS Node.js Services Developer Certification](https://training.linuxfoundation.org/certification/jsnsd/?_gl=1*1oqn94q*_ga*MjEwMDcxOTEzMy4xNjg2MDQ2ODA2*_ga_EMX7DDZMX4*MTY4NzQyNTA0My4xMjUuMS4xNjg3NDI2MDY5LjUzLjAuMA..) by [Linux Foundation](https://www.linuxfoundation.org/).

[Linux Foundation Events](https://events.linuxfoundation.org/).
[Linux Foundation Certification Catalog](https://training.linuxfoundation.org/certification-catalog/?_gl=1*krfpjr*_ga*MjEwMDcxOTEzMy4xNjg2MDQ2ODA2*_ga_EMX7DDZMX4*MTY4NzQyNTA0My4xMjUuMS4xNjg3NDI3ODc2LjE1LjAuMA..).
[Linux Foundation Training](https://training.linuxfoundation.org/?_gl=1%2A11vbr5u%2A_ga%2AMjEwMDcxOTEzMy4xNjg2MDQ2ODA2%2A_ga_EMX7DDZMX4%2AMTY4NzQyNTA0My4xMjUuMS4xNjg3NDI3ODgyLjkuMC4w).
[Open JS Foundation](https://openjsf.org/).

---

## 02. Setting Up

### Install NodeJS

The recommended way to install Node.js on macOS and Linux is by using a _Node version manager_, using **[NVM](https://github.com/nvm-sh/nvm)**.

##### Node Version Check:
```
> node -v
```

##### NPM Version Check:
```
> npm -v
```

---

## 03. Creating a Web Server

### Creating a Web Server

##### Node HTTP Core: [Node HTTP Core Server](./creating_web_server/node_http_core).

##### Node Express: [Node Express Server](./creating_web_server/express).

##### Node Fastify: [Node Fastify Server](./creating_web_server/fastify).

---

## 04. Serving Web Content

### Serving Static Content

##### Serving Static Content Express: [Static Content Express](./serving_web_content/express).

##### Serving Static Content Fastify: [Static Content Fastify](./serving_web_content/fastify).

### Using Templates

##### Using Templates Express: [Templates Express](./using_templates/express).

##### Using Templates Fastify: [Templates Fastify](./using_templates/fastify).

### Streaming Content

##### Streaming Content Express: [Streaming Content Express](./streaming_content/express/).

##### Streaming Content Fastify: [Streaming Content Fastify](./streaming_content/fastify/).

---

## 05. Creating RESTful JSON Services

### Implementing a RESTful JSON

##### RESTful JSON Express: [RESTful JSON Express](./implementing_a_restful_json/express/).

##### RESTful JSON Fastify: [RESTful JSON Fastify](./implementing_a_restful_json/fastify/).

---

## 06. Manipulating Data with RESTful Services

### Implementing POST PUT DELETE

##### POST PUT DELETE Express: [POST PUT DELETE Express](./implementing_post_put_delete/express/)

##### POST PUT DELETE Fastify: [POST PUT DELETE Fastify](./implementing_post_put_delete/fastify/)

---

## 07. Consuming and Aggregating Services

### Mock Services

##### Node HTTP Core Server Services: [Node HTTP Core Server Services](./consuming_and_aggregating_services/node_http_core/).

### Fetching and Combining Data and Managing Status Codes

##### Node Express Server: [Node Express Server](./consuming_and_aggregating_services/express/).

##### Node Fastify Server: [Node Fastify Server](./consuming_and_aggregating_services/fastify/).

---

## 08. Proxying HTTP Requests

### Single-Route Multi-Origin Proxy

##### Node Express Server: [Node Express Server](./proxying_http_requests/express/).

##### Node Fastify Server: [Node Fastify Server](./proxying_http_requests/fastify/).

### Single-Origin Multi-Route Proxy

##### Node Express Server: [Node Express Server](./proxying_http_requests/single_origin_multi_route_proxy/express/).

##### Node Fastify Server: [Node Fastify Server](./proxying_http_requests/single_origin_multi_route_proxy/fastify/).

---

## 09. Web Security Handling User Input

### Route Validation

##### Node Express Server: [Node Express Server](./web_security_handling_user_input/express/).

##### Node Fastify Server: [Node Fastify Server](./web_security_handling_user_input/fastify/).

---

## 10. Web Security Mitigating Attacks

### Block an Attackers IP Address

##### Node Express Server: [Node Express Server](./web_security_mitigating_attacks/express/).

##### Node Fastify Server: [Node Fastify Server](./web_security_mitigating_attacks/fastify/).

---
---

## Labs

### 03. Creating a Web Server

#### Lab 3.1 Deliver Data from a Library API

##### Node HTTP Core: [Node HTTP Core](./labs/lab_3_1_deliver_data_from_library_api/node_http/).

##### Node Express: [Node Express](./labs/lab_3_1_deliver_data_from_library_api/node_express/).

##### Node Fastify: [Node Fastify](./labs/lab_3_1_deliver_data_from_library_api/node_fastify/).

<br>

#### Lab 3.2 Implement a Status Code Response

##### Node HTTP Core: [Node HTTP Core](./labs/lab_3_2_implement_a_status_code_response/node_http/).

##### Node Express: [Node Express](./labs/lab_3_2_implement_a_status_code_response/node_express/).

##### Node Fastify: [Node Fastify](./labs/lab_3_2_implement_a_status_code_response/node_fastify/).

---

### 04. Serving Web Content

#### Lab 4.1 - Render a View

##### Node Express: [Node Express](./labs/lab_4_1_render_a_view/express/).

##### Node Fastify: [Node Fastify](./labs/lab_4_1_render_a_view/fastify/).

<br>

#### Lab 4.2 Stream Some Content

##### Node Express: [Node Express](./labs/lab_4_2_stream_some_content/express/).

##### Node Fastify: [Node Fastify](./labs/lab_4_2_stream_some_content/fastify/).

---

### 05. Creating RESTful JSON Services

#### Lab 5.1 Implement a RESTful JSON

##### Node Express: [Node Express](./labs/lab_5_1_implement_a_restful_json/express/).

##### Node Fastify: [Node Fastify](./labs/lab_5_1_implement_a_restful_json/fastify/).

---

### 06. Manipulating Data with RESTful Services

#### Lab 6.1 Implement a RESTful JSON POST

##### Node Express: [Node Express](./labs/lab_6_1_implement_a_restful_json_post/express/).

##### Node Fastify: [Node Fastify](./labs/lab_6_1_implement_a_restful_json_post/fastify/).

<br>

#### Lab 6.2 Implement a RESTful JSON DELETE

##### Node Express: [Node Express](./labs/lab_6_2_implement_a_restful_json_delete/express/).

##### Node Fastify: [Node Fastify](./labs/lab_6_2_implement_a_restful_json_delete/fastify/).

---

### 07. Consuming and Aggregating Services

#### Lab 7.1 Implement a Data Aggregating Service

##### Node HTTP Core Services: [Node HTTP Core Services](./labs/lab_7_1_implement_a_data_aggregating_service/node_http_core/).

##### Node Express: [Node Express](./labs/lab_7_1_implement_a_data_aggregating_service/express/).

##### Node Fastify: [Node Fastify](./labs/lab_7_1_implement_a_data_aggregating_service/fastify/).

---

### 08. Proxying HTTP Requests

#### Lab 8.1 Implement an HTTP Route-Based Proxy

##### Node Express: [Node Express](./labs/lab_8_1_implement_an_http_route_based_proxy/express/).

##### Node Fastify: [Node Fastify](./labs/lab_8_1_implement_an_http_route_based_proxy/fastify/).

<br>

#### Lab 8.2 Implement a Full Proxying Service

##### Node Express: [Node Express](./labs/lab_8_2_implement_a_full_proxying_service/express/).

##### Node Fastify: [Node Fastify](./labs/lab_8_2_implement_a_full_proxying_service/fastify/).

---

### 09. Web Security Handling User Input

#### Lab 9.1 Implement a Service That Is Not Vulnerable to Parameter Pollution

##### Node Express: [Node Express](./labs/lab_9_1_implement_a_service_that_is_not_vulnerable_to_parameter_pollution/express/).

##### Node Fastify: [Node Fastify](./labs/lab_9_1_implement_a_service_that_is_not_vulnerable_to_parameter_pollution/fastify/).

<br>

#### Lab 9.2 Validate a POST Request

##### Node Express: [Node Express](./labs/lab_9_2_validate_a_post_request/express/).

##### Node Fastify: [Node Fastify](./labs/lab_9_2_validate_a_post_request/fastify/).

---

### 10. Web Security Mitigating Attacks

#### Lab 10.1 Block an Attackers IP Address With Express

##### Node Express: [Node Express](./labs/lab_10_block_an_attackers_ip_address/lab_10_1_block_an_attackers_ip_address/express/).

<br>

#### Lab 10.2 Block an Attackers IP Address With Fastify

##### Node Fastify: [Node Fastify](./labs/lab_10_block_an_attackers_ip_address/lab_10_2_block_an_attackers_ip_address/fastify/).

---
---

## References and Helpers

[Express HTTP Proxy Middleware](https://github.com/chimurai/http-proxy-middleware)

[Express Request](https://expressjs.com/en/4x/api.html#req)

[Express Response](https://expressjs.com/en/4x/api.html#res)

[Express Error Handling](https://expressjs.com/en/guide/error-handling.html)

[Express Validator](https://express-validator.github.io/docs/)

[Express Behind Proxies](https://expressjs.com/en/guide/behind-proxies.html#express-behind-proxies)

[Fastify Request](https://www.fastify.io/docs/latest/Reference/Request/#request)

[Fastify Reply](https://www.fastify.io/docs/latest/Reference/Reply/#reply)

[Fastify Routes Options](https://www.fastify.io/docs/latest/Reference/Routes/#options)

[Fastify Validator Compiler](https://www.fastify.io/docs/latest/Reference/Validation-and-Serialization/#validator-compiler)

[Fastify Adding a Shared Schema](https://www.fastify.io/docs/latest/Reference/Validation-and-Serialization/#adding-a-shared-schema)

[Fastify Fluent JSON Schema](https://github.com/fastify/fluent-json-schema)

[Fastify Testing](https://www.fastify.io/docs/latest/Guides/Testing/)

[Fastify Reply Redirect](https://www.fastify.io/docs/latest/Reference/Reply/#redirectcode)

[Fastify Reply From](https://github.com/fastify/fastify-reply-from)

[Fastify Plugin](https://github.com/fastify/fastify-plugin)

[Fastify Plugins](https://www.fastify.io/docs/latest/Reference/Plugins/)

[Fastify Sensible](https://github.com/fastify/fastify-sensible)

[Fastify Trust Proxy](https://www.fastify.io/docs/latest/Reference/Server/#trustproxy)

[Fastify Hooks](https://www.fastify.io/docs/latest/Reference/Hooks/)

[Fastify Lifecycle](https://www.fastify.io/docs/latest/Reference/Lifecycle/)

[HTTP Response Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

[HTTP Request Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

[Cross Site Scripting XSS](https://owasp.org/www-community/attacks/xss/)

[Cross Site Scripting XSS](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting)

[Point of View](https://github.com/fastify/point-of-view)

[Transfer Encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding)

[Readable Stream](https://www.npmjs.com/package/readable-stream)

[JSON Specification](https://www.json.org/json-en.html)

[JSON Schema](https://json-schema.org/)

[Architectural Styles and the Design of Network-based Software Architectures](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm)

[Representational State Transfer](https://en.wikipedia.org/wiki/Representational_state_transfer)

[Representational State Transfer](https://developer.mozilla.org/en-US/docs/Glossary/REST)

[Application Programming Interface](https://developer.mozilla.org/en-US/docs/Glossary/API)

[Simple Object Access Protocol](https://en.wikipedia.org/wiki/SOAP)

[Simple Object Access Protocol](https://developer.mozilla.org/en-US/docs/Glossary/SOAP)

[Remote Procedure Call](https://en.wikipedia.org/wiki/Remote_procedure_call)

[GOT](https://github.com/sindresorhus/got)

[Reflected Attack](https://owasp.org/www-project-web-security-testing-guide/stable/4-Web_Application_Security_Testing/07-Input_Validation_Testing/01-Testing_for_Reflected_Cross_Site_Scripting)

[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

[Promise All](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

[Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

[Node HTTP](https://nodejs.org/api/http.html)

[Node HTTP GET](https://nodejs.org/api/http.html#httpgeturl-options-callback)

[Node Stream](https://nodejs.org/api/stream.html)

[Node Socket Remote Address](https://nodejs.org/api/net.html#net_socket_remoteaddress)

[Node CLI](https://nodejs.org/api/cli.html)

[Set Timeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)

[Clear Timeout](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout)

[Request Destroy](https://nodejs.org/api/http.html#requestdestroyerror)

[Proxy Server](https://developer.mozilla.org/en-US/docs/Glossary/Proxy_server)

[Proxy Server and Tunneling](https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy_servers_and_tunneling)

[Iterating Over Async Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of#iterating_over_async_generators)

[For Await...Of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of)

[SQL Injection](https://developer.mozilla.org/en-US/docs/Glossary/SQL_Injection)

[Cross Site Request Forgery](https://developer.mozilla.org/en-US/docs/Glossary/CSRF)

[URL Search](https://developer.mozilla.org/en-US/docs/Web/API/URL/search)

[URL Constructor](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)

[Supertest](https://github.com/ladjs/supertest)

[To String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toString)

[Is Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

[DoS Attack](https://developer.mozilla.org/en-US/docs/Glossary/DOS_attack)

[DDoS Attack](https://developer.mozilla.org/en-US/docs/Glossary/Distributed_Denial_of_Service)

[NGINX](nginx.com)

[Varnish Cache](https://varnish-cache.org/)

---
---