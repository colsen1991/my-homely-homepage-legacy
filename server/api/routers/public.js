const express = require('express');
const path = require('path');
const blogConsumer = require('../consumers/blog');
const authenticationConsumer = require('../consumers/authentication');

const router = express.Router();

router.get('/blog', blogConsumer.getBlogIdList);
router.get('/blog/:blogId', blogConsumer.getBlog);
router.get('/blog/:blogId/excerpt', blogConsumer.getBlogExcerpt);
router.post('/login', authenticationConsumer.login);

module.exports = router;
