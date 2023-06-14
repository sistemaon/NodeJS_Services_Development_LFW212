# NodeJS_Services_Development_LFW212

## Proxying HTTP Requests

### Node Express Server

#### Install:
```
npm install
```
#### Run:
```
npm start
```
### Create Another Server:
```
node -e "http.createServer((_, res) => (res.setHeader('Content-Type', 'text/plain'), res.end('hello world'))).listen(5000)"
```