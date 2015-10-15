const express = require('express');
const blogConsumer = require('./../consumers/blogConsumer');
const authenticationConsumer = require('./../consumers/authenticationConsumer');

const router = express.Router();

router.get('/blog', blogConsumer.getBlogIdList);
router.get('/blog/:blogId', blogConsumer.getBlog);
router.get('/blog/:blogId/excerpt', blogConsumer.getBlogExcerpt);
router.post('/login', authenticationConsumer.login);

router.use(authenticationConsumer.validateJWT);
router.get('/users', authenticationConsumer.getUsers);

module.exports = router;
