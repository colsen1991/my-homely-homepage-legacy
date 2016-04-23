const path = require('path');
const wadsworth = require('../logging/wadsworth');

function errorHandler(error, req, res, ignore) { // eslint-disable-line
  wadsworth.logError(error);

  res.status(500);

  if (req.xhr)
    res.json({ error: 'A thing happened...' });
  else
    res.sendFile(path.resolve(`${__dirname}/../../web/error.html`));
}

module.exports = errorHandler;
