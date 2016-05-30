const jwt = require('jsonwebtoken');
const wadsworth = require('../../logging/wadsworth');

function logError(req, res) {
  wadsworth.logFrontendError(req.body)

  res.status(204).send();
}

exports.logError = logError;
