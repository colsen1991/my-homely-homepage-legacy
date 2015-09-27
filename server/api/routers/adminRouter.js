'use strict';

var express = require('express');
var userConsumer = require('./../consumers/adminConsumer');

var secureRouter = express.Router();

secureRouter.post('/login', userConsumer.login);

secureRouter.use(userConsumer.validateJWT);

secureRouter.get('/users', userConsumer.getUsers);

module.exports = secureRouter;


