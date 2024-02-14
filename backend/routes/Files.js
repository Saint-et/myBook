//utilisation d'express
const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/Files');


// get one file
router.get('/illustration/file/:id', Ctrl.GetIllustrationfile);

//Get Group files
router.get('/group-illustration/files/:id', Ctrl.GetGroupfiles);

//Get Group files
router.get('/file-params/files/:id', Ctrl.GetParamsfiles);

//Get Group files
router.put('/new-bookmark', Ctrl.newBookMark);

//Get Group files
router.put('/file-params/update-tags/:id', Ctrl.updateTags);

// get one file
router.get('/illustration-user/files/:id', Ctrl.GetUserfiles);

// get news files
router.get('/announcement-similar/best-announcement/:key', Ctrl.GetSimilarAnnouncement);

// get one file
router.get('/similar/file/:key', Ctrl.GetfileSimilar);

module.exports = router;