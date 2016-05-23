/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const serverLogFile = path.resolve(__dirname, '..', '..', 'server.log');
const webappLogFile = path.resolve(__dirname, '..', '..', 'server.log');

function writeFile(type, text, logFile = serverLogFile) {
  fs.appendFile(logFile, `[${type}] ${new Date().toUTCString()}: ${text}\n`, 'utf8', error => {
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

function logWebappError(error) {
  writeFile('ERROR', JSON.stringify(error), webappLogFile);

  console.log('WEBAPP ERROR');
}

exports.logInfo = logInfo;
exports.logWarning = logWarning;
exports.logError = logError;
