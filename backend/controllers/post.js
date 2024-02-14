const Posts = require('../models/post');
const { models } = require('../db/mysql');
const fs = require('fs');

exports.CreatePost = async (req, res, next) => {

  const userImg = req.file ?
    {
      ...req.body,
      adminId: req.session.user.id,
      tags: JSON.parse(req.body.tags),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
      ...req.body,
      tags: JSON.parse(req.body.tags),
      adminId: req.session.user.id
    };

  const build = Posts.build(userImg)

  build.save()
    .then(() => res.status(200).json({ message: `${req.body.name} has been successfully created.` }))
    .catch(() => res.status(400).json({ message: 'File was not created.' }))
}
exports.UpdatePost = async (req, res, next) => {

  if (req.file != undefined || req.body.imageUrl == '') {
    const filename = req.body.imageUrlDelete.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => { });
  }

  const userImg = req.file ?
    {
      ...req.body,
      tags: JSON.parse(req.body.tags) || [],
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
      ...req.body,
      tags: JSON.parse(req.body.tags) || [],
      imageUrl: req.body.imageUrl || ''
    };


  Posts.update(userImg, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: `${req.body.name} has been successfully created.` }))
    .catch(() => res.status(400).json({ message: 'File was not created.' }))
}
exports.GetOnePost = async (req, res, next) => {
  await Posts.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'adminId', 'imageUrl', 'title', 'data', 'createdAt'],
    include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'premium', 'resizeImageUrlCover'] }]
  })
    .then((promise) => {
      return res.status(200).json(promise)
    })
    .catch(() => {
      return res.status(400).json({ message: 'no found' })
    })
}
exports.GetNewsPost = async (req, res, next) => {
  await Posts.findAll({
    where: { adminId: req.params.id },
    attributes: ['id', 'adminId', 'imageUrl', 'title', 'data', 'tags', 'createdAt'],
    include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'premium', 'resizeImageUrlCover'] }],
    order: [['createdAt', 'DESC']],
    limit: 10
  })
    .then((promise) => {
      return res.status(200).json(promise)
    })
    .catch(() => {
      return res.status(400).json({ message: 'no found' })
    })
}

// navbar

exports.GetSomeBestAnnouncement = async (req, res, next) => {
  try {
    await Posts.findAll({
      where: {},
      attributes: ['id', 'adminId', 'imageUrl', 'title', 'data', 'createdAt'],
      include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'premium', 'resizeImageUrlCover'] }],
      order: [['createdAt', 'DESC']],
    })
      .then((promise) => {
        return res.status(200).json(promise)
      })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.GetAllAnnouncement = async (req, res, next) => {
  await Posts.findAll({
    where: {},
    attributes: ['id', 'adminId', 'imageUrl', 'title', 'data', 'tags', 'createdAt'],
    include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'premium', 'resizeImageUrlCover'] }],
    order: [['createdAt', 'DESC']]
  })
    .then((promise) => {
      return res.status(200).json(promise)
    })
    .catch(() => {
      return res.status(400).json({ message: 'no found' })
    })
}