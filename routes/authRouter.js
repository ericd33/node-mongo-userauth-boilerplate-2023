const router = require('express').Router();
const authController = require('../controller/auth')

router.get('/login', authController.login);

router.post('/signup', authController.signup);

module.exports = router;