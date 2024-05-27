//utilisation d'express
const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer-config');
const Ctrl = require('../controllers/users');
const session = require('../middlewares/session');
const verification = require('../middlewares/verification');
const err = require('../middlewares/middlewares-error');


// get one user
router.get('/populars/users', Ctrl.Get_User_Populars);

// get one user
router.get('/profil', session.Invited,  Ctrl.Get_user_session, err.errorHandler_200);

// get one user
router.get('/get/user/follewers/:id/:key', session.Invited,  Ctrl.Get_followers, err.errorHandler_200);

// get one user
router.get('/user/:id', verification.Url, Ctrl.Get_user_profile, err.errorHandler_200);
// get one user
router.get('/user-params/:id', session.LoginFalse, verification.Url, Ctrl.Get_user_profile_params, err.errorHandler_200);

router.put('/updateUserAll', session.Invited,  Ctrl.Update_user_profile_toggle, err.errorHandler_200);

// get one user
router.put('/updateUserPrivate', session.Invited,  Ctrl.Update_user_private_account, err.errorHandler_200);
router.put('/updateUserPremium', session.Invited,  Ctrl.Update_user_premium_account, err.errorHandler_200);
router.put('/updateUserAccessPass', session.Invited,  Ctrl.Update_user_accessPass, err.errorHandler_200);

// get one user
router.put('/updateUserAdultAccess', session.Invited,  Ctrl.Update_user_profile_adult_access, err.errorHandler_200);

// update one user
router.put('/update/username', session.LoginFalse, Ctrl.Update_user_profile_name, err.errorHandler_200);

// update one user
router.put('/users/update', session.LoginFalse,  multer, Ctrl.Update_user_profile_picture, err.errorHandler_200);

// update one user
router.put('/cover/picture', session.LoginFalse,  multer, Ctrl.Update_cover_picture, err.errorHandler_200);

// update one user
router.put('/users/update/email', session.LoginFalse, Ctrl.Update_user_email, err.errorHandler_200);

// update one user
router.put('/users/update/security', session.LoginFalse, Ctrl.Update_security_user, err.errorHandler_200);

// update one user
router.put('/users/update/pinned', session.LoginFalse, Ctrl.Update_pinned_user, err.errorHandler_200);

// get users
router.get('/user/get/pinned/:id', session.LoginFalse, Ctrl.get_user_pinned, err.errorHandler_200);

// get users
router.get('/user/get/pinned-illustration/:id', session.LoginFalse, Ctrl.Get_illustration_pinned, err.errorHandler_200);

module.exports = router;