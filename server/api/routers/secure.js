const express = require('express');
const userConsumer = require('../consumers/user');
const blogConsumer = require('../consumers/blog');
const validateJwtMiddleware = require('../../middleware/validateJwt');

const router = express.Router();

router.use(validateJwtMiddleware);
router.get('/users', userConsumer.getUsers);
router.get('/allBlogs', blogConsumer.getAllBlogs);
router.get('/blog/:_id', blogConsumer.getBlogForEditing);
router.post('/blog', blogConsumer.postBlog);
router.put('/blog/:_id', blogConsumer.putBlog);

module.exports = router;
