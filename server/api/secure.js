const express = require('express');
const blogConsumer = require('./consumers/blog');
const validateJwtMiddleware = require('./../middleware/security');

const router = express.Router();

router.use(validateJwtMiddleware);
router.get('/admin', blogConsumer.getBlogsForAdmin);
router.get('/blog/edit/:_id', blogConsumer.getBlogForEditing);
router.post('/blog', blogConsumer.newBlog);
router.put('/blog/:_id', blogConsumer.updateBlog);

module.exports = router;
