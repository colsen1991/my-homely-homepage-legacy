const express = require('express');
const userConsumer = require('../consumers/user');
const blogConsumer = require('../consumers/blog');
const validateJwtMiddleware = require('../../middleware/validateJwt');

const router = express.Router();

router.use(validateJwtMiddleware);
router.get('/users', userConsumer.getUsers);
router.get('/allBlogs', blogConsumer.getAllBlogs);
router.get('/blog/:id', blogConsumer.getBlogForEditing);

module.exports = router;
