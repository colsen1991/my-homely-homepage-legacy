const express = require('express');
const blogConsumer = require('./consumers/blog');
const userConsumer = require('./consumers/user');
const errorConsumer = require('./consumers/error');

const router = express.Router();

router.get('/blog', blogConsumer.getBlogs);
router.get('/blog/:id', blogConsumer.getBlog);
router.post('/login', userConsumer.login);
router.post('/error', errorConsumer.logError);

module.exports = router;
