//utilisation d'express
const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/profileUser');
const session = require('../middlewares/session');
const verification = require('../middlewares/verification');



// get news files
router.get('/newsfiles/get-files/:id/:key', verification.Url, Ctrl.GetNewsfiles);

// get catalog files
router.get('/catalogfiles/get-files/:key/:type/:id', verification.Url, Ctrl.GetCatalogfiles);

// get one tag
router.get('/get-profil/get-tags/:id', Ctrl.GetTagsprofil);

// get catalog files
router.get('/catalogfilestags/get-files/:key/:type/:id/:name', verification.Url, Ctrl.GetCatalogfilesTags);

// get catalog files
router.get('/cataloglibrarys/get-library/:id', verification.Url, Ctrl.Get_library_user);


module.exports = router;