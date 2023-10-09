const File = require('../models/files');
const { models } = require('../db/mysql');

exports.GetFilesTabs = async (req, res, next) => {
    console.log(req.params);
    //await File.findAll({
    //  where: { adminId: req.params.id },
    //  attributes: ['id', 'name', 'type', 'miniature', 'data', 'comments', 'groupId', 'adult', 'ai','adminId','tags','visibility'],
    //  include: [{ model: models.images, attributes: ['id', 'imageUrl', 'order'] }]
    //})
    //  .then((promise) => {
    //    return res.status(200).json(promise)
    //  })
    //  .catch(() => { return res.status(400).json({ message: 'no found' }) })
  }