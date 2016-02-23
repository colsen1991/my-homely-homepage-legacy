const jwt = require('jsonwebtoken');
const wadsworth = require('../logging/wadsworth');

function validateJWT(req, res, next) {
  jwt.verify(req.get('Authorization'), req.app.get('credentials').key, (error, decoded) => {
    if (error) {
      wadsworth.logError(error);
      res.sendStatus(401);
    } else {
      req.decoded = decoded;
      next();
    }
  });
}

module.exports = validateJWT;
