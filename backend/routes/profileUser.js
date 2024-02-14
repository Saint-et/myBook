//utilisation d'express
const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/profileUser');
const session = require('../middlewares/session');
const verification = require('../middlewares/verification');



// get news files
router.get('/newsfiles/get-files/:id/:key', verification.Url, Ctrl.GetNewsfiles);

// get catalog files
router.get('/catalogfiles/get-files/:key/:id', verification.Url, session.LoginFalse, Ctrl.GetCatalogfiles);

// get catalog files
router.get('/catalogfilestags/get-files/:key/:id/:name', verification.Url, session.LoginFalse, Ctrl.GetCatalogfilesTags);


module.exports = router;