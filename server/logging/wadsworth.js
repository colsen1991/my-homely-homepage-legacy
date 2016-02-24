function logInfo(info) {
  console.info(info);
}

function logWarning(warning) {
  console.warn(warning);
}

function logError(error) {
  console.error(error.stack);
}

exports.logInfo = logInfo;
exports.logWarning = logWarning;
exports.logError = logError;
