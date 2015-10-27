const path = require('path');

function notFoundHandler(req, res) {
  res.sendStatus(404);
}

function errorHandler(error, req, res, next) {
  console.error(error);
  res.status(500);
  if (req.xhr)
    res.json({error: 'A thing happened...'});
  else
    res.sendFile(path.resolve(__dirname + '/../../web/error.html'));
}

exports.notFoundHandler = notFoundHandler;
exports.errorHandler = errorHandler;
