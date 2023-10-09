//utilisation d'express
const express = require('express');
const router = express.Router();
//const multer = require('../middlewares/multer-config');
const Ctrl = require('../controllers/discussion');
const session = require('../middlewares/session');



//post one discussion
router.post('/create/discussion', session.LoginFalse,  Ctrl.createDiscussion);

//post one discussion
router.get('/discussion/get', session.LoginFalse,  Ctrl.getDiscussion);

//post one discussion
router.get('/discussion/get/:id', session.LoginFalse,  Ctrl.getOneDiscussion);

//post one discussion
router.post('/post/message', session.LoginFalse,  Ctrl.postOneMessage);

//post one discussion
router.get('/message/get/:id', session.LoginFalse,  Ctrl.getMessage);


//post one discussion
router.delete('/message/delete/:id', session.LoginFalse,  Ctrl.deleteDiscution);



module.exports = router;