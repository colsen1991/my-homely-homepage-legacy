const path = require('path');

function notFoundHandler(req, res) {
  res.status(404).sendFile(path.resolve(`${__dirname}/../../web/notFound.html`));
}

module.exports = notFoundHandler;
