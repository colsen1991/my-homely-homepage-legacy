const jwt = require('jsonwebtoken');
const wadsworth = require('../../logging/wadsworth');
const UserModel = require('../../db/models/user');

function login(req, res) {
  UserModel.findOne({ username: req.body.username }, (error, data) => {
    if (error) {
      wadsworth.logError(error);
      res.sendStatus(500);
    } else if (!data || req.body.password !== data.password) {
      res.sendStatus(401);
    } else {
      const token = jwt.sign({ username: data.username }, req.app.get('credentials').key, { expiresInMinutes: 1440 });
      res.send({ token: token });
    }
  });
}

function getUsers(req, res) {
  UserModel.find((error, data) => {
    if (error) {
      wadsworth.logError(error);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
}

exports.login = login;
exports.getUsers = getUsers;
