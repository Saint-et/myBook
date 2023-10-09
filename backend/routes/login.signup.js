//utilisation d'express
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/login.signup');
//const session = require('../middleware/session')



// inscription
router.post('/signup', userCtrl.signup);
// connexion
router.post('/login', userCtrl.login);

router.get('/logout', userCtrl.logout);

router.post('/password-forgot', userCtrl.PasswordForgot);

router.post('/password-reset/:key', userCtrl.ResetPassWord);


module.exports = router;