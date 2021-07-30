const pinoHttp = require("pino-http");
const pino = require("pino");
const uuid  = require ("uuid");
const { middleware, setValue, getValue } = require('express-ctx');
const loggerHelper = require('./loggerHelper');
const { LOGGER_KEY } = require('./loggerConstants')


function logger(loggerParms){
	if(loggerParms){
		loggerMiddlewares.loggerParms = Object.assign({}, loggerParms)
	}
	return loggerMiddlewares.returnMiddlewares();
}


var loggerMiddlewares = {
	loggerParms: {
		debug_logs: true
	},

    bindPinoHttpMiddleware: function(req, res, next) {
       var logger = pinoHttp({
       	  level: loggerMiddlewares.loggerParms.debug_logs ? "debug": "info",
	      logger: pino(),
	      genReqId: function (req) { return uuid.v4() },
	      serializers: {
	        req(req) {
	          req.headers = Object.assign(req.raw.headers, {
	            "X-Sub-Correlation-Id": uuid.v4(),
	            "X-Correlation-Id": req.raw.headers["X-Correlation-Id"] ? req.raw.headers["X-Correlation-Id"] : uuid.v4()
	          })
	          req.body = req.raw.body;
	          return req;
	        },
	      }
	    });
	    logger(req, res);
        next();
    },
    bindCtxMiddleware: function(req, res, next) {
    	setValue(LOGGER_KEY, req.log);
    	next();
    },
    bindRequestInitationMiddleware: function(req, res, next) {
       loggerHelper.log("request started");
       next();
    },
    bindResponseCoReleationID: function(req, res, next) {
       res.setHeader('X-Correlation-Id', req.headers['X-Correlation-Id']);	
       next();
    },
    returnMiddlewares: function(){
    	return [
    		middleware,
    		loggerMiddlewares.bindPinoHttpMiddleware,
    		loggerMiddlewares.bindCtxMiddleware,
    		loggerMiddlewares.bindRequestInitationMiddleware,
    		loggerMiddlewares.bindResponseCoReleationID
    	]
    }
}


module.exports = logger;   			
   			