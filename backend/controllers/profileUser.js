const File = require('../models/files');
const { Op, Sequelize } = require('sequelize');
const { models } = require('../db/mysql');


//Home Profil

exports.GetNewsfiles = async (req, res, next) => {
  let key = req.params.key || 'Illustrations';
  await File.findAll({
    where: { adminId: req.params.id, type: key, visibility: 1 },
    attributes: ['id', 'name', 'type', 'miniature', 'data', 'adult', 'createdAt', 'ai', 'imagesCount', 'groupId'],
    include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'premium', 'resizeImageUrlCover'] }],
    order: [['updatedAt', 'DESC']],
    limit: 18
  })
    .then((promise) => {
      return res.status(200).json(promise)
    })
    .catch(() => { return res.status(400).json({ message: 'no found' }) })
}

exports.GetCatalogfiles = async (req, res, next) => {
  let num = parseInt(req.params.key)

  await File.findAndCountAll({
    where: { adminId: req.params.id, visibility: 1 },
    attributes: ['id', 'name', 'type', 'miniature', 'data', 'adult', 'createdAt', 'ai', 'imagesCount', 'groupId'],
    include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'premium', 'resizeImageUrlCover'] }],
    order: [['createdAt', 'DESC']],
    limit: 6,
    offset: num,
    subQuery: false
  })
    .then((promise) => {
      return res.status(200).json(promise)
    })
}

exports.GetCatalogfilesTags = async (req, res, next) => {
  let num = parseInt(req.params.key)
  const searchValue = req.params.name.toLowerCase();
  try {
    await File.findAndCountAll({
      where: {
        adminId: req.params.id, visibility: 1,
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${searchValue}%`, // Recherche de nom insensible à la casse
            },
          },
          Sequelize.literal(`LOWER(tags) LIKE '%${searchValue}%'`),
        ],
      },
      attributes: ['id', 'name', 'type', 'miniature', 'data', 'adult', 'createdAt', 'ai', 'imagesCount', 'groupId'],
      include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'premium', 'resizeImageUrlCover'] }],
      order: [['createdAt', 'DESC']],
      limit: 6,
      offset: num,
      subQuery: false
    })
      .then((promise) => {
        console.log(1452);
        return res.status(200).json({ promise })
      })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
