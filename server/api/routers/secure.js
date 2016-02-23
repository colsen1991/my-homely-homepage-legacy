const express = require('express');
const authenticationConsumer = require('../consumers/authentication');
const validateJwtMiddleware = require('../../middleware/validateJwt');

const router = express.Router();

router.use(validateJwtMiddleware);
router.get('/users', authenticationConsumer.getUsers);

module.exports = router;
