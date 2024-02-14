//utilisation d'express
const express = require('express');
const router = express.Router();
const session = require('../middlewares/session');
const Ctrl = require('../controllers/adminController');

router.post('/new-admin/:id',  session.LoginFalse, Ctrl.NewAdmin );

router.post('/new-master/:id',  session.LoginFalse, Ctrl.NewMaster );

module.exports = router;