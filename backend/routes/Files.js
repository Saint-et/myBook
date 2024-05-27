const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/Files');
const err = require('../middlewares/middlewares-error');
const session = require('../middlewares/session');


router.get('/illustration/file/:key/:id', Ctrl.GetIllustrationfile, err.errorHandler_200);

router.get('/group-illustration/files/:key/:id', Ctrl.GetGroupfiles, err.errorHandler_200);

router.get('/file-params/files/:key/:id', Ctrl.GetParamsfiles, err.errorHandler_200);

router.put('/new-bookmark/:id', session.LoginFalse, Ctrl.newBookMark, err.errorHandler_200);

router.put('/file-params/update-tags/:id', session.LoginFalse, Ctrl.updateTags);

router.get('/illustration-user/files/:key/:id', Ctrl.GetUserfiles);

router.get('/announcement-similar/best-announcement/:key', Ctrl.GetSimilarAnnouncement, err.errorHandler_200);

router.get('/similar/file/:key1/:key', Ctrl.GetfileSimilar, err.errorHandler_200);

router.get('/home/files', Ctrl.GetHomefile, err.errorHandler_200);

module.exports = router;