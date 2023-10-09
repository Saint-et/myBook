//utilisation d'express
const express = require('express');
const router = express.Router();
const session = require('../middlewares/session');
const Ctrl = require('../controllers/adminController');

router.post('/new-admin/:id',  session.LoginFalse, Ctrl.NewAdmin );

module.exports = router;