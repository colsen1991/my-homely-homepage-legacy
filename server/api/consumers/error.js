const jwt = require('jsonwebtoken');
const wadsworth = require('../../logging/wadsworth');
const User = require('../../db/models/user');

const ONE_DAY = 60 * 60 * 24;

function login(req, res) {
  User.findOne({ username: req.body.username }, (error, data) => {
    if (error) {
      wadsworth.logError(error);
      res.sendStatus(500);
    } else if (!data || req.body.password !== data.password) {
      res.sendStatus(401);
    } else {
      res.send({
        token: jwt.sign({ username: data.username }, req.app.get('credentials').key, { expiresIn: ONE_DAY })
      });
    }
  });
}

exports.login = login;
