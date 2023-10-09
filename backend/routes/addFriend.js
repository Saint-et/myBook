//utilisation d'express
const express = require('express');
const router = express.Router();
const session = require('../middlewares/session');
const addFriendCtrl = require('../controllers/addFriend');


// ajout liste
router.post('/addfriend',  session.LoginFalse, addFriendCtrl.addFollowers);

router.post('/cancelfriend',  session.LoginFalse, addFriendCtrl.cancelFollowers);
// remove liste
router.post('/refusefriend',  session.LoginFalse, addFriendCtrl.removeFollowers);


module.exports = router;