//utilisation d'express
const express = require('express');
const router = express.Router();
const session = require('../middlewares/session');

router.get('/add');

module.exports = router;