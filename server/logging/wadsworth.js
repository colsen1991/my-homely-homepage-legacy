/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const serverLogFile = path.resolve(__dirname, '..', '..', 'server.log');

function writeFile(type, text) {
  fs.appendFile(serverLogFile, `[${type}] ${new Date().toUTCString()}: ${text}\n`, 'utf8', error => {
    if (error) console.error(error);
  });
}

function logInfo(info) {
  writeFile('INFO', info);

  console.info(info);
}

function logWarning(warning) {
  writeFile('WARN', warning);

  console.warn(warning);
}

function logError(error) {
  writeFile('ERROR', error);

  console.error(error.stack);
}

exports.logInfo = logInfo;
exports.logWarning = logWarning;
exports.logError = logError;
