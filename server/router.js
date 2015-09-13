'use string';

var express = require('express');
var consumer = require('./consumer');

var router = express.Router();

router.get('/', consumer.doGetRoot);
router.get('/comments', consumer.doGetComments);
router.post('/comments', consumer.doPostComments);

module.exports = router;
