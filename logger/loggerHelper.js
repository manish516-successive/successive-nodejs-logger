const { getValue } = require("express-ctx");
const { LOGGER_KEY } = require('./loggerConstants')

const loggerHelper = {};

loggerHelper.log = (message) => {
  getValue(LOGGER_KEY).info(message);
}

loggerHelper.error = (message, trace) => {
  getValue(LOGGER_KEY).error(message, trace);
}

loggerHelper.warn = (message) => {
 getValue(LOGGER_KEY).warn(message);
}

loggerHelper.debug = (message) => {
  getValue(LOGGER_KEY).debug(message);
}

loggerHelperverbose = (message) => {
 getValue(LOGGER_KEY).verbose(message);
}

module.exports = loggerHelper


  

