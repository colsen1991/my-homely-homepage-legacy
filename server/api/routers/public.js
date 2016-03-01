const express = require('express');
const blogConsumer = require('../consumers/blog');
const authenticationConsumer = require('../consumers/authentication');

const router = express.Router();

router.get('/blog/excerpts', blogConsumer.getExcerpts);
router.get('/blog/:id', blogConsumer.getBlog);
router.post('/login', authenticationConsumer.login);

module.exports = router;
