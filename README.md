# successive-nodejs-logger

It is HTTP JSON Logger based on pino-http for Express Js. It prints log on each request initiation , on each error and on each request completion with X-Sub-Correlation-Id and X-Correlation-Id. It also exposes a helper method to print custom logs at different levels (log, error, warn. debug and verbose).

- [Installation](#installation)
- [Examples](#examples)

### Installation
```
npm i successive-nodejs-logger --save
```

### Examples

- Include logger middleware before route initiation to print log on each request initiation , on each error and on each request completion with X-Sub-Correlation-Id and X-Correlation-Id
  
  ```
  const { expressLogger } = require('successive-nodejs-logger');
  app.use(expressLogger());
  app.use('/', indexRouter);
  
  {"level":30,"time":1627877768457,"pid":27844,"hostname":"my-host","req":{"id":"c9108341-6faa-4913-93ec-527ed2a61ecc","method":"GET","url":"/users","query":{},"params":{},"headers":{"content-type":"application/json","user-agent":"PostmanRuntime/7.28.1","accept":"*/*","postman-token":"573f1a94-b633-4dee-995d-2f33d05992c5","host":"localhost:3000","accept-encoding":"gzip, deflate, br","connection":"keep-alive","content-length":"19","X-Sub-Correlation-Id":"95ccd6a9-78c7-4c99-9522-b2608c6de1bb","X-Correlation-Id":"278718dc-ba33-411f-aba2-97905e699ffc"},"remoteAddress":"::1","remotePort":47440,"body":{},"msg":"request started"}
  
  {"level":30,"time":1627877768468,"pid":27844,"hostname":"my-host","req":{"id":"c9108341-6faa-4913-93ec-527ed2a61ecc","method":"GET","url":"/users","query":{},"params":{},"headers":{"content-type":"application/json","user-agent":"PostmanRuntime/7.28.1","accept":"*/*","postman-token":"573f1a94-b633-4dee-995d-2f33d05992c5","host":"localhost:3000","accept-encoding":"gzip, deflate, br","connection":"keep-alive","content-length":"19","X-Sub-Correlation-Id":"95ccd6a9-78c7-4c99-9522-b2608c6de1bb","X-Correlation-Id":"278718dc-ba33-411f-aba2-97905e699ffc"},"remoteAddress":"::1","remotePort":47440,"body":{},"res":{"statusCode":200,"headers":{"x-powered-by":"Express","x-correlation-id":"278718dc-ba33-411f-aba2-97905e699ffc","content-type":"text/html; charset=utf-8","content-length":"23","etag":"W/\"17-dz3lQFWsvaILP0XWy2YesfdbyNA\""}},"responseTime":11,"msg":"request completed"}


  ```
- This middleware also accepts a parameter to disable debug logs
 
  ```
  const { expressLogger } = require('successive-nodejs-logger');
  app.use(expressLogger({
    debug_logs: true
  }));
  app.use('/', indexRouter);
  ```
- Include Logger method to print custom logs at different levels.
 
  ```
  const { expressLoggerHelper } = require('successive-nodejs-logger');
  
  router.get('/', function(req, res, next) {
    expressLoggerHelper.debug("This is a debug log");
    expressLoggerHelper.log("This is a info log");
    expressLoggerHelper.warn("This is a warning log")
    res.send('respond with a resource');
  });
  
  {"level":20,"time":1627881419365,"pid":45993,"hostname":"my-host","req":{"id":"1515e5d9-2c1d-4eaa-ad0a-69a1b73d870b","method":"GET","url":"/users","query":{},"params":{},"headers":{"content-type":"application/json","user-agent":"PostmanRuntime/7.28.1","accept":"*/*","postman-token":"4a1709bf-aac1-49a4-9fd9-be99fef456f6","host":"localhost:3000","accept-encoding":"gzip, deflate, br","connection":"keep-alive","content-length":"19","X-Sub-Correlation-Id":"4650d5ee-2422-4908-8391-839802b5ba84","X-Correlation-Id":"6de4f4de-1b8e-44c1-973d-b176ed2cf836"},"remoteAddress":"::1","remotePort":48314,"body":{}},"msg":"This is a debug log"}
  
  {"level":30,"time":1627881419365,"pid":45993,"hostname":"my-host","req":{"id":"1515e5d9-2c1d-4eaa-ad0a-69a1b73d870b","method":"GET","url":"/users","query":{},"params":{},"headers":{"content-type":"application/json","user-agent":"PostmanRuntime/7.28.1","accept":"*/*","postman-token":"4a1709bf-aac1-49a4-9fd9-be99fef456f6","host":"localhost:3000","accept-encoding":"gzip, deflate, br","connection":"keep-alive","content-length":"19","X-Sub-Correlation-Id":"4650d5ee-2422-4908-8391-839802b5ba84","X-Correlation-Id":"6de4f4de-1b8e-44c1-973d-b176ed2cf836"},"remoteAddress":"::1","remotePort":48314,"body":{}},"msg":"This is a info log"}
  
  {"level":40,"time":1627881419365,"pid":45993,"hostname":"my-host","req":{"id":"1515e5d9-2c1d-4eaa-ad0a-69a1b73d870b","method":"GET","url":"/users","query":{},"params":{},"headers":{"content-type":"application/json","user-agent":"PostmanRuntime/7.28.1","accept":"*/*","postman-token":"4a1709bf-aac1-49a4-9fd9-be99fef456f6","host":"localhost:3000","accept-encoding":"gzip, deflate, br","connection":"keep-alive","content-length":"19","X-Sub-Correlation-Id":"4650d5ee-2422-4908-8391-839802b5ba84","X-Correlation-Id":"6de4f4de-1b8e-44c1-973d-b176ed2cf836"},"remoteAddress":"::1","remotePort":48314,"body":{}},"msg":"This is a warning log"}
 ```
