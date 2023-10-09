//utilisation d'express
const express = require('express');
const router = express.Router();
const session = require('../middlewares/session');
const Ctrl = require('../controllers/Files_management_auto');

router.get('/auto/get-files-tabs/:id', Ctrl.GetFilesTabs );

module.exports = router;