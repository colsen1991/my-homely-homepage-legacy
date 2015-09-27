'use strict';

var express = require('express');
var blogConsumer = require('./../consumers/blogConsumer');

var publicRouter = express.Router();

publicRouter.get('/blog', blogConsumer.getBlogIdList);
publicRouter.get('/blog/:blogId', blogConsumer.getBlog);
publicRouter.get('/blog/:blogId/excerpt', blogConsumer.getBlogExcerpt);

module.exports = publicRouter;
