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
router.get('/myfile/file/:id', Ctrl.GetOnefiles);

// get Images file
//router.get('/myfile-image/file-image/:id', Ctrl.GetOnefilesImages);

// post one file
router.post('/create/file', session.LoginFalse, Ctrl.CreateFile);

// search files
router.get('/search/myfiles/files/:key', Ctrl.SearchMyfiles);

// delete one file
router.delete('/delete/file/:id', session.LoginFalse, Ctrl.fileDelete)

// put one file
router.put('/update/article/:id', Ctrl.UpdateArticle);

// put one file
router.post('/download/imgs/:id', multer_multi, Ctrl.downloadImgArticle);

// get one group
router.get('/mygroup/group/:id', Ctrl.GetOneGroup);

// put one group
router.put('/update/mygroup/:id', multer, Ctrl.UpdateGroupsfiles);

// post one group
router.post('/create/group', session.LoginFalse, Ctrl.CreateGroups);

// get groups
router.get('/mygroups/groups/:key', session.LoginFalse, Ctrl.GetMygroups);

// search groups
router.get('/search/mygroups/groups/:key/:page', Ctrl.SearchMygroups);

// put groups files
router.put('/update/groups/files', Ctrl.UpdateMyfilesGroup);

// put groups files
router.put('/update/group-files', Ctrl.UpdateFilesGroup);

// get files
router.get('/mygroups/groups/files/:id', session.LoginFalse, Ctrl.GetMyfilesGroup);

// delete one image
router.post('/delete/image/:id', session.LoginFalse, Ctrl.DeleteMyImage)

// get one tag
router.get('/get-profil/get-tags/:id', session.LoginFalse, Ctrl.GetTagsprofil);

// get one tag
router.get('/get/get-tags', session.LoginFalse, Ctrl.GetTags);

// delete one tag
router.put('/update/update-tags', session.LoginFalse, Ctrl.UpdateTags);

// get news files
router.get('/newsfiles/get-files/:id', verification.Url, Ctrl.GetNewsfiles);

// get catalog files
router.get('/catalogfiles/get-files/:key/:id', verification.Url, session.LoginFalse, Ctrl.GetCatalogfiles);

// get catalog files
router.get('/catalogfilestags/get-files/:key/:id/:name', verification.Url, session.LoginFalse, Ctrl.GetCatalogfilesTags);



module.exports = router;