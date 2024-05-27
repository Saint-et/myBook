const File = require('../models/files');
const { Op, Sequelize } = require('sequelize');
const { models } = require('../db/mysql');
const Groupsfiles = require('../models/groups_files');
const User = require('../models/user');


//Home Profil

exports.GetNewsfiles = async (req, res, next) => {
  try {
    // Check if the key is valid
    if (req.params.key !== 'Illustrations' && req.params.key !== 'Manga') {
      return res.status(400).json({ message: 'Invalid key' });
    }

    const whereParams = req.session.user !== undefined ?
      req.session.user.adultAccess ?
        { adminId: req.params.id, type: req.params.key, visibility: 1 }
        :
        { adminId: req.params.id, type: req.params.key, visibility: 1, adult: 0 }
      :
      { adminId: req.params.id, type: req.params.key, visibility: 1, adult: 0 };


    // Find files based on adminId and type with visibility 1
    const files = await File.findAll({
      where: whereParams,
      attributes: ['id', 'name', 'type', 'miniature', 'data', 'adult', 'createdAt', 'ai', 'imagesCount', 'groupId', 'shop', 'diamond'],
      include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'premium', 'resizeImageUrlCover'] }],
      order: [['dateRework', 'DESC']],
      limit: 24
    });

    // Return the found files
    return res.status(200).json(files);
  } catch (error) {
    // Handle any errors
    console.error('Error in GetNewsfiles:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.GetCatalogfiles = async (req, res, next) => {
  let num = parseInt(req.params.key)


  const whereParams = req.session.user !== undefined ?
    req.session.user.adultAccess ?
      { adminId: req.params.id, type: req.params.type, visibility: 1 }
      :
      { adminId: req.params.id, type: req.params.type, visibility: 1, adult: 0 }
    :
    { adminId: req.params.id, type: req.params.type, visibility: 1, adult: 0 };

  await File.findAndCountAll({
    where: whereParams,
    attributes: ['id', 'name', 'type', 'miniature', 'data', 'adult', 'createdAt', 'ai', 'imagesCount', 'groupId', 'shop', 'diamond'],
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

  const whereParams = req.session.user !== undefined ?
    req.session.user.adultAccess ?
      { adminId: req.params.id, type: req.params.type, visibility: 1 }
      :
      { adminId: req.params.id, type: req.params.type, visibility: 1, adult: 0 }
    :
    { adminId: req.params.id, type: req.params.type, visibility: 1, adult: 0 };


  try {
    await File.findAndCountAll({
      where: {
        ...whereParams,
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${searchValue}%`, // Recherche de nom insensible à la casse
            },
          },
          Sequelize.literal(`LOWER(tags) LIKE '%${searchValue}%'`),
        ],
      },
      attributes: ['id', 'name', 'type', 'miniature', 'data', 'adult', 'createdAt', 'ai', 'imagesCount', 'groupId', 'shop', 'diamond'],
      include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'premium', 'resizeImageUrlCover'] }],
      order: [['createdAt', 'DESC']],
      limit: 6,
      offset: num,
      subQuery: false
    })
      .then((promise) => {
        return res.status(200).json({ promise })
      })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

exports.Get_library_user = async (req, res, next) => {
  let num = parseInt(req.params.id)

  const whereParams = req.session.user !== undefined ?
    req.session.user.adultAccess ?
      { visibility: 1 }
      :
      { visibility: 1, adult: 0 }
    :
    { visibility: 1, adult: 0 };

  await Groupsfiles.findAll({
    where: { adminId: num },
    attributes: ['id', 'name', 'imageUrl', 'data', 'adminId', 'createdAt'],
    include: [{

      model: models.files,
      attributes: ['id', 'name', 'type', 'miniature', 'adult', 'createdAt', 'ai', 'imagesCount', 'shop'],
      where: whereParams
    }],
    order: [['name', 'ASC']]
  })
    .then((promise) => {
      return res.status(200).json(promise)
    })
}


exports.GetTagsprofil = async (req, res, next) => {
  await User.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'myTags']
  })
    .then((promise) => {
      return res.status(200).json(promise.dataValues.myTags)
    })
}