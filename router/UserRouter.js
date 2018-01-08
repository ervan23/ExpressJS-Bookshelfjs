const controller = require('../controller/UserController.js');
const express = require('express');
const validatorHandler = require('../middleware/validatorHandler.js');
const passport = require('passport');
const auth = require('../middleware/authHandler.js');

const router = express.Router();
auth.setPassport(passport);

router.get('/', auth.authenticate(['admin']), controller.getAllUser);
router.get('/:id', auth.authenticate(['admin']), controller.getUser);
router.post('/', [auth.authenticate(['admin']), validatorHandler.insertValidator], controller.insertUser);
router.put('/change_status', auth.authenticate(['admin']), controller.changeUserStatus);
router.put('/', [auth.authenticate(['admin']), validatorHandler.updateValidator], controller.updateUser);
router.delete('/:id', auth.authenticate(['admin']), controller.deleteUser);

module.exports = router;
