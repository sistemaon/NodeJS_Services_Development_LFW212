# NodeJS_Services_Development_LFW212

## Lab

### Lab 8.2 - Implement a Full Proxying Service

### Node Express Server

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
