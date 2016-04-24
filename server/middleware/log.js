const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const requestsLogFile = path.resolve(__dirname, '..', '..', 'requests.log');

module.exports = morgan('combined', { stream: fs.createWriteStream(requestsLogFile) });
