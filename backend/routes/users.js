//utilisation d'express
const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer-config');
const Ctrl = require('../controllers/users');
const session = require('../middlewares/session');
const verification = require('../middlewares/verification');


// get one user
router.get('/populars/users', Ctrl.getUserPopulars);

// get one user
router.get('/profil', session.Invited,  Ctrl.getProfil);

// get one user
router.get('/user/:id', verification.Url, Ctrl.getUserProfil);

// get one user
router.get('/getfollewers', session.Invited,  Ctrl.getProfilFollowers);

// get one user
router.put('/updateUserPrivate', session.Invited,  Ctrl.updateUserPrivate);
router.put('/updateUserPremium', session.Invited,  Ctrl.updateUserPremium);
router.put('/updateUserAll', session.Invited,  Ctrl.updateUserAll);

// get one user
router.put('/updateUserAdultAccess', session.Invited,  Ctrl.updateUserAdultAccess);

// update one user
router.put('/update/username', session.LoginFalse, Ctrl.updateUserName);

// update one user
router.put('/users/update', session.LoginFalse,  multer, Ctrl.updateUser);

// update one user
router.put('/cover/picture', session.LoginFalse,  multer, Ctrl.updateCoverPicture);

// update one user
router.put('/users/update/email', session.LoginFalse, Ctrl.updateUserEmail);

// update one user
router.put('/users/update/security', session.LoginFalse, Ctrl.updateSecurityUser);

// update one user
router.put('/users/update/pinned', session.LoginFalse, Ctrl.updatePinnedUser);

// get users
router.get('/user/get/pinned/:id', session.LoginFalse, Ctrl.getUserPinned);

// get users
router.get('/user/get/pinned-illustration/:id', session.LoginFalse, Ctrl.getIllustrationPinned);

module.exports = router;