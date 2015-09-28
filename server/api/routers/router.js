'use strict';

var express = require('express');
var blogConsumer = require('./../consumers/blogConsumer');
var authenticationConsumer = require('./../consumers/authenticationConsumer');

var router = express.Router();

router.get('/blog', blogConsumer.getBlogIdList);
router.get('/blog/:blogId', blogConsumer.getBlog);
router.get('/blog/:blogId/excerpt', blogConsumer.getBlogExcerpt);
router.post('/login', authenticationConsumer.login);

router.use(authenticationConsumer.validateJWT);
router.get('/users', authenticationConsumer.getUsers);

module.exports = router;
