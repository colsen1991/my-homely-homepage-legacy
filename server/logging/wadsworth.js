function logInfo(info) {
  console.info(info); // eslint-disable-line
}

function logWarning(warning) {
  console.warn(warning); // eslint-disable-line
}

function logError(error) {
  console.error(error.stack); // eslint-disable-line
}

exports.logInfo = logInfo;
exports.logWarning = logWarning;
exports.logError = logError;
