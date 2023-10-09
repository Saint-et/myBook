//utilisation d'express
const express = require('express');
const router = express.Router();
//const multer = require('../middlewares/multer-config');
const Ctrl = require('../controllers/notification');
const session = require('../middlewares/session');

// get one file
router.get('/mynotif/notif', session.LoginFalse,  Ctrl.GetMynotif);

// delete one file
router.delete('/delete/notif/:id', session.LoginFalse, Ctrl.notifDelete)

// delete all file
router.delete('/delete/notifs', session.LoginFalse, Ctrl.notifAllDelete)

// delete all file
router.delete('/delete/messages', session.LoginFalse, Ctrl.MessageAllDelete)

// get one file
router.get('/mynotifMessage/notifMessage', session.LoginFalse,  Ctrl.GetMynotifMessage);

// delete one file
router.delete('/delete/notifMessage/:id', session.LoginFalse, Ctrl.DeleteMynotifMessage)

module.exports = router;