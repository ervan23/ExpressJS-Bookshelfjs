const controller = require('../controller/AuthController.js');
const validatorHandler = require('../middleware/validatorHandler.js');
const express = require('express');

const router = express.Router();

router.post('/login', controller.login);
router.post('/register', validatorHandler.insertValidator, controller.register);
router.post('/forgot_password', controller.forgotPassword);
router.post('/reset_password', controller.resetPassword);

module.exports = router;
