//utilisation d'express
const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer-config');
const Ctrl = require('../controllers/Files_management');
const session = require('../middlewares/session');
const verification = require('../middlewares/verification');
const multer_multi = require('../middlewares/multer-multi-config');


// get files
router.get('/myfiles/files/:key', session.LoginFalse, Ctrl.GetMyfiles);

// get one file
router.get('/myfile/file/:id', session.LoginFalse, Ctrl.GetOnefiles);


// post one file
router.post('/create/file', session.LoginFalse, Ctrl.CreateFile);

// search files
router.get('/search/myfiles/files/:key', session.LoginFalse, Ctrl.SearchMyfiles);

// delete one file
router.delete('/delete/file/:id', session.LoginFalse, Ctrl.fileDelete)

// put one file
router.put('/update/article/:id', session.LoginFalse, Ctrl.UpdateArticle);

// put one file
router.post('/download/imgs/:id', session.LoginFalse, multer_multi, Ctrl.downloadImgArticle);

// get one group
router.get('/mygroup/group/:id', session.LoginFalse, Ctrl.GetOneGroup);

// put one group
router.put('/update/mygroup/:id', session.LoginFalse, multer, Ctrl.UpdateGroupsfiles);

// post one group
router.post('/create/group', session.LoginFalse, Ctrl.CreateGroups);

// get groups
router.get('/mygroups/groups/:key', session.LoginFalse, Ctrl.GetMygroups);

// search groups
router.get('/search/mygroups/groups/:key/:page', session.LoginFalse, Ctrl.SearchMygroups);

// put groups files
router.put('/update/groups/files', session.LoginFalse, Ctrl.UpdateMyfilesGroup);

// put groups files
router.put('/update/group-files', session.LoginFalse, Ctrl.UpdateFilesGroup);

// put groups img
router.post('/update/lock-img/unlock-img/:id', session.LoginFalse, Ctrl.ImgLimit);

// get files
router.get('/mygroups/groups/files/:id', session.LoginFalse, Ctrl.GetMyfilesGroup);

// delete groups
router.delete('/delete/group/:id', session.LoginFalse, Ctrl.DeleteGroup);

// delete groups
router.delete('/delete-all/group-and-files/:id', session.LoginFalse, Ctrl.DeleteGroupAndFiles);

// delete one image
router.post('/delete/image/:id', session.LoginFalse, Ctrl.DeleteMyImage)

// get one tag
router.get('/get/get-tags', session.LoginFalse, Ctrl.GetTags);

// delete one tag
router.put('/update/update-tags', session.LoginFalse, Ctrl.UpdateTags);



module.exports = router;