const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const requestsLogFile = path.resolve(__dirname, '..', '..', 'requests.log');

exports.logFile = morgan('combined', { stream: fs.createWriteStream(requestsLogFile) });
exports.logConsole = morgan('combined');
