'use strict';

var jwt = require('jsonwebtoken');
var server = require('./../../../server');
var UserModel = require('./../../db/models/userModel');

function login(req, res) {
  UserModel.findOne({username: req.body.username}, function (error, data) {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else if (!data || req.body.password !== data.password) {
      res.sendStatus(401);
    } else {
      var token = jwt.sign({username: data.username}, server.app.get('credentials').key, {expiresInMinutes: 1440});
      res.send({token: token});
    }
  });
}

function validateJWT(req, res, next) {
  jwt.verify(req.get('Authorization'), server.app.get('credentials').key, function (error, decoded) {
    if (error) {
      console.error(error);
      res.sendStatus(401);
    } else {
      req.decoded = decoded;
      next();
    }
  });
}

function getUsers(req, res) {
  UserModel.find(function (error, data) {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
}

exports.login = login;
exports.validateJWT = validateJWT;
exports.getUsers = getUsers;
