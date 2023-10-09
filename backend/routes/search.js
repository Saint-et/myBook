//utilisation d'express
const express = require('express');
const router = express.Router();
const session = require('../middlewares/session')
const Ctrl = require('../controllers/search');



// get all user
router.get('/search/users/name/:key', Ctrl.UsersName);

router.post('/search/new-tags', Ctrl.SaveTagsName);

router.get('/search/tags/:key', Ctrl.TagsName);

// get all user
router.get('/search/articles/name/:key', Ctrl.ArticleName);


module.exports = router;