//utilisation d'express
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/login.signup');
const err = require('../middlewares/middlewares-error')
const session = require('../middlewares/session')



// inscription
router.post('/signup', userCtrl.signup, err.errorHandler_200);
// connexion
router.post('/login', userCtrl.login, err.errorHandler_200);

router.get('/logout', userCtrl.logout, err.errorHandler_200);

router.post('/password-forgot', userCtrl.PasswordForgot, err.errorHandler_200);

router.post('/password-reset/:key', userCtrl.ResetPassWord, err.errorHandler_200);

router.get('/session/verification-login', session.Check_session);


module.exports = router;