//utilisation d'express
const express = require('express');
const router = express.Router();
//const multer = require('../middlewares/multer-config');
const Ctrl = require('../controllers/Folders_management');
const session = require('../middlewares/session');

// get one folder
router.get('/myfolders/folders', session.LoginFalse,  Ctrl.GetMyFolders);

//post one folder
router.post('/create/folder', session.LoginFalse,  Ctrl.CreateFolder);

//search folders
router.get('/search/myfolders/folders/:key', Ctrl.SearchMyFolders);

//delete one folder
router.delete('/delete/folder/:id', session.LoginFalse, Ctrl.FolderDelete)

module.exports = router;