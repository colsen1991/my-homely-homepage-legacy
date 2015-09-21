'use strict';

var express = require('express');
var consumer = require('./consumer');

var router = express.Router();

router.get('/comments', consumer.doGetComments);
router.post('/comments', consumer.doPostComments);

module.exports = router;
