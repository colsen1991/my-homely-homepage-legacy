/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const serverLogFile = path.resolve(__dirname, '..', '..', 'server.log');
const frontendLogFile = path.resolve(__dirname, '..', '..', 'frontend.log');

function writeFile(type, text, logFile = serverLogFile) {
  fs.appendFile(logFile, `[${type}] ${new Date().toUTCString()}: ${text}\n`, 'utf8', error => {
    if (error) console.error(error);
  });
}

function logInfo(info) {
  writeFile('INFO', info);

  console.info(`[INFO] ${info}`);
}

function logWarning(warning) {
  writeFile('WARN', warning);

  console.warn(`[WARN] ${warning}`);
}

function logError(error) {
  writeFile('ERROR', error);

  console.error(`[ERROR] ${error.stack}`);
}

function logFrontendError(error) {
  writeFile('ERROR', JSON.stringify(error), frontendLogFile);

  console.error(`[FRONTEND ERROR] ${error.stack}`);
}

exports.logInfo = logInfo;
exports.logWarning = logWarning;
exports.logError = logError;
exports.logFrontendError = logFrontendError;
