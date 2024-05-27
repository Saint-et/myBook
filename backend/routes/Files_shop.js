//utilisation d'express
const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/Files_shop');
const err = require('../middlewares/middlewares-error');


router.get('/get/user-diamond/:id', Ctrl.Get_user_profile_diamond);

router.get('/get/work-space/access-pass/:id', Ctrl.get_work_space_access_pass);

router.put('/update/add-to/access-pass/:id', Ctrl.NewArticle);

router.put('/update/remove-to/access-pass/:id', Ctrl.RemoveArticle);

router.get('/access-pass/home/files', Ctrl.GetAccessPassFiles, err.errorHandler_200);

router.get('/access-pass/file/:id', Ctrl.GetOnefiles, err.errorHandler_200);

router.post('/access-pass/buy/file/:id', Ctrl.PostBuyArticle, err.errorHandler_200);

module.exports = router;