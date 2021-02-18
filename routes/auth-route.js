const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
// const isAuth = require('../middlewares/is-auth');

router.post('/register', authController.postRegister);

router.post('/login', authController.postLogin);

module.exports = router;