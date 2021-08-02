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

  
