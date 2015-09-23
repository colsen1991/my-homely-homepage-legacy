'use strict';

var express = require('express');
var consumer = require('./consumer');

var router = express.Router();

router.get('/blog', consumer.doGetBlogIdList);
router.get('/blog/:blogId', consumer.doGetBlog);
router.get('/blog/:blogId/excerpt', consumer.doGetBlogExcerpt);

module.exports = router;
