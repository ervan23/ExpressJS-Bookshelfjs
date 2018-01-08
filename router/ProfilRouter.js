const controller = require('../controller/ProfilController.js');
const express = require('express');
const validatorHandler = require('../middleware/validatorHandler.js');
const passport = require('passport');
const auth = require('../middleware/authHandler.js');

const router = express.Router();
auth.setPassport(passport);

router.get('/', auth.authenticate(['user']), controller.getProfil);
router.put('/', [auth.authenticate(['user']), validatorHandler.updateProfileValidator], controller.updateProfil);

module.exports = router;
