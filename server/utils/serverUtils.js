const path = require('path');

function notFoundHandler(req, res) {
  res.status(404).sendFile(path.resolve(`${__dirname}/../../public/notFound.html`));
}

function errorHandler(error, req, res, next) {
  console.error(`${error.message}\n${error.stack}`);

  res.status(500);

  if (req.xhr)
    res.json({error: 'A thing happened...'});
  else
    res.sendFile(path.resolve(`${__dirname}/../../public/error.html`));
}

exports.notFoundHandler = notFoundHandler;
exports.errorHandler = errorHandler;