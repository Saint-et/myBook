//utilisation d'express
const express = require('express');
const router = express.Router();
//const multer = require('../middlewares/multer-config');
const Ctrl = require('../controllers/post');
const multer = require('../middlewares/multer-config');
const verification = require('../middlewares/verification');




// put groups files
router.post('/post/new-post', multer, Ctrl.CreatePost);
// put groups files
router.put('/post/update-post/:id', multer, Ctrl.UpdatePost);

// get news files
router.get('/post/get-post/:id', verification.Url, Ctrl.GetNewsPost);

// get news files
router.get('/announcement/best-announcement', Ctrl.GetSomeBestAnnouncement);

module.exports = router;