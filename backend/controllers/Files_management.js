const File = require('../models/files');
const User = require('../models/user');
const fs = require('fs');
const { Op, Sequelize } = require('sequelize');
let myRegex = new RegExp(/^[0-9a-zA-Z-éçàùè]+$/i);
const { models } = require('../db/mysql');
const Groupsfiles = require('../models/groups_files');
const Image = require('../models/images');


exports.SearchMyfiles = async (req, res, next) => {
  const searchValue = req.params.key.toLowerCase();
  if (!myRegex.test(req.params.key)) {
    return res.status(400).json({ message: 'Special characters are not supported.' })
  }
  await File.findAndCountAll({
    include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl'] }, { model: models.groupsfiles, attributes: ['id', 'name'] }],
    where: { adminId: req.session.user.id, [Op.or]: [{ name: {
      [Op.like]: `${searchValue}%` } }, Sequelize.literal(`LOWER(tags) LIKE '%${searchValue}%'`)] },
    attributes: ['id', 'name', 'type', 'groupId', 'miniature', 'createdAt', 'visibility', 'ai'],
    //order: [['name', 'ASC']],
    limit: 20
  })
    .then(promise => {
      return res.status(200).json(promise)
    })
    .catch(() => { return res.status(400).json({ message: 'The search page no longer exists or refresh page.' }) })
}

exports.GetMyfiles = async (req, res, next) => {
  let num = parseInt(req.params.key)
  await File.findAndCountAll({
    include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl'] }, { model: models.groupsfiles, attributes: ['id', 'name'] }],
    where: { adminId: req.session.user.id },
    attributes: ['id', 'name', 'type', 'groupId', 'miniature', 'createdAt', 'visibility', 'ai'],
    order: [['createdAt', 'DESC']],
    limit: 5,
    offset: num,
    subQuery: false,
    distinct: true
  })
    .then((promise) => {
      return res.status(200).json(promise)
    })
}

exports.GetOnefiles = async (req, res, next) => {
  await File.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'name', 'type', 'data', 'visibility', 'miniature', 'resize', 'adminId', 'tags', 'comments', 'groupId', 'adult', 'ai'],
    include: [{ model: models.images, attributes: ['id', 'imageUrl', 'caption', 'order'] }],
    order: [
      [models.images, 'order', 'asc']
    ]
  })
    .then((promise) => {
      if (promise.dataValues.adminId === req.session.user.id) {
        return res.status(200).json(promise)
      } else {
        return res.status(400).json({ message: 'You cannot access this page.' })
      }
    })
    .catch(() => { return res.status(400).json({ message: 'The search page no longer exists.' }) })
}

//exports.GetOnefilesImages = async (req, res, next) => {
//  await Image.findAll({
//    where: { fileId: req.params.id },
//    attributes: ['id', 'imageUrl', 'order'],
//    order: [['order', 'ASC']],
//  })
//    .then((promise) => {
//      //if (req.params.key === req.session.user.id) {
//      return res.status(200).json(promise)
//      //} else {
//      //  return res.status(400).json({ message: 'You cannot access this page.' })
//      //}
//    })
//    .catch(() => { return res.status(400).json({ message: 'The search page no longer exists.' }) })
//}


exports.CreateFile = async (req, res, next) => {

  if (req.body.name == '' || req.body.type == null) {
    return res.status(400).json({ message: 'please fill in all fields.' })
  }

  const build = File.build({
    adminId: req.session.user.id,
    name: req.body.name,
    type: req.body.type,
    groupId: req.body.groupId
  })

  build.save()
    .then(() => res.status(200).json({ message: `${req.body.name} has been successfully created.` }))
    .catch(() => res.status(400).json({ message: 'File was not created.' }))
}
exports.downloadImgArticle = async (req, res, next) => {
  try {
    let filenameArr =
      req.body.imageUrl === undefined ?
        []
        :
        Array.isArray(req.body.imageUrl) ?
          req.body.imageUrl
          :
          [req.body.imageUrl];

    if (Array.isArray(req.files) && req.files.length > 0) {
      // Si des nouveaux fichiers ont été téléchargés, ajoutez-les à la liste d'images
      const customIndex = parseInt(req.body.itemsCount)
      const newImageUrls = req.files.map((file, index) => {
        return {
          imageUrl: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
          fileId: req.params.id,
          order: customIndex + parseInt(index) + 1
        }
      });

      filenameArr = filenameArr.concat(newImageUrls);
    }

    await Image.bulkCreate(filenameArr);

    if (req.body.miniature == null) {
      await File.update({ miniature: filenameArr[0].imageUrl, imagesCount: parseInt(req.body.itemsCount) + parseInt(filenameArr.length) }, { where: { id: req.params.id } })
    } else {
      await File.update({ imagesCount: parseInt(req.body.itemsCount) + parseInt(filenameArr.length) }, { where: { id: req.params.id } })
    }

    return res.status(200).json({ message: 'The images were successfully uploaded.' });
  } catch (error) {
    File.findOne({where: { id: req.params.id}})
    .then(async(promise) => {
      if (!promise) {
        await req.files?.map((img) => {
          fs.unlink(`uploads/${img.filename}`, () => { })
        })
      }
    })
    return res.status(500).json({ message: 'Error updating article', error: error });
  }
};


exports.UpdateArticle = async (req, res, next) => {
  //console.log(req.body);
  if (req.body.name == '') {
    return res.status(400).json({ message: 'Name cannot be empty' });
  }
  if (req.body.adult == null || req.body.visibility == null || req.body.ai == null || req.body.comments == null) {
    return res.status(400).json({ message: 'please fill in all fields require' });
  }
  if (req.body.tags.length > 10) {
    return res.status(400).json({ message: 'you have exceeded the number of allowed tags' });
  }
  try {
    let filenameArr = [];
    if (req.body.items.length > 0) {
      // Si des nouveaux fichiers ont été téléchargés, ajoutez-les à la liste d'images
      const newImageUrls = req.body.items.map((file, index) => {
        return {
          id: file.id,
          order: parseInt(index) + 1,
          imageUrl: file.imageUrl
        }
      });
      filenameArr = filenameArr.concat(newImageUrls);


      // Créez un tableau d'objets pour les mises à jour
      const imageUpdates = newImageUrls.map((file) => ({
        order: file.order
      }));

      // Utilisez Promise.all pour effectuer toutes les mises à jour d'images en parallèle
      await Promise.all(newImageUrls.map((file, index) => {
        return Image.update(imageUpdates[index], { where: { id: file.id } });
      }));
    }

    const build = {
      name: req.body.name,
      data: req.body.data,
      tags: req.body.tags,
      adult: req.body.adult,
      visibility: req.body.visibility,
      miniature: req.body.miniature,
      ai: req.body.ai,
      imagesCount: req.body.imagesCount,
      comments: req.body.comments,
      resize: req.body.resize
    }

    await File.update(build, { where: { id: req.params.id } });
    return res.status(200).json({ message: 'Management picture has been successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating article', error: error });
  }
};

exports.fileDelete = async (req, res, next) => {
  await Image.findAll({ where: { fileId: req.params.id } })
    .then(async (promise) => {
      await promise?.map((img) => {
        const filename = img.imageUrl.split('/uploads/')[1]
        fs.unlink(`uploads/${filename}`, () => { })
      })

      await File.destroy({ where: { id: req.params.id } })
        .then(() => {
          return res.status(200).json({ message: 'File deleted' });
        })
    })

}

// groupsSection

exports.GetOneGroup = async (req, res, next) => {
  await Groupsfiles.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'name', 'imageUrl', 'groupTags'],
    include: [{ model: models.users, attributes: ['id'] }]
  })
    .then((promise) => {
      if (promise.dataValues.user.dataValues.id === req.session.user.id) {
        return res.status(200).json(promise)
      } else {
        return res.status(400).json({ message: 'You cannot access this page.' })
      }
    })
    .catch(() => { return res.status(400).json({ message: 'The search page no longer exists.' }) })
}

exports.CreateGroups = async (req, res, next) => {
  if (req.body.name == '') {
    return res.status(400).json({ message: 'please fill in all fields.' })
  }

  const build = Groupsfiles.build({
    adminId: req.session.user.id,
    name: req.body.name
  })

  build.save()
    .then(() => res.status(200).json({ message: `${req.body.name} has been successfully created.` }))
    .catch(() => res.status(400).json({ message: 'File was not created.' }))
}

exports.UpdateGroupsfiles = async (req, res, next) => {
  await Groupsfiles.findOne({ where: { id: req.params.id } })
    .then((propmise) => {

      const bodyBuild = req.file ?
        {
          ...req.body,
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
          ...req.body
        };

      if (propmise._previousDataValues.imageUrl == null || bodyBuild.image == propmise._previousDataValues.imageUrl) {
        Groupsfiles.update({ ...bodyBuild }, { where: { id: req.params.id } })
          .then(() => { return res.status(200).json({ message: 'user changed' }); })
      } else {
        if (bodyBuild.image == propmise._previousDataValues.imageUrl || bodyBuild.image != null) {
          const filename = propmise.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Groupsfiles.update({ ...bodyBuild, imageUrl: null }, { where: { id: req.params.id } })
              .then(() => { return res.status(200).json({ message: 'user changed' }); })
          });
        } else {
          const filename = propmise.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Groupsfiles.update({ ...bodyBuild }, { where: { id: req.params.id } })
              .then(() => { return res.status(200).json({ message: 'user changed' }); })
          });
        };
      };

    })
}

exports.GetMygroups = async (req, res, next) => {
  let num = parseInt(req.params.key)
  await Groupsfiles.findAndCountAll({
    where: { adminId: req.session.user.id },
    attributes: ['id', 'name', 'createdAt', 'imageUrl'],
    include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl'] }],
    order: [['createdAt', 'DESC']],
    limit: 5,
    offset: num,
    subQuery: false
  })
    .then((promise) => {
      return res.status(200).json(promise)
    })
}


exports.SearchMygroups = async (req, res, next) => {
  let num = parseInt(req.params.page)
  if (!myRegex.test(req.params.key)) {
    return res.status(400).json({ message: 'Special characters are not supported.' })
  }
  try {
    await Groupsfiles.findAndCountAll({
      where: { [Op.or]: [{ name: { [Op.like]: req.params.key + '%' } }] },
      attributes: ['id', 'name', 'createdAt', 'imageUrl'],
      include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl'] }],
      order: [['name', 'DESC']],
      limit: 6,
      offset: num,
      subQuery: false
    })
      .then(promise => {
        return res.status(200).json(promise)
      });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }

}

exports.GetMyfilesGroup = async (req, res, next) => {
  await File.findAndCountAll({
    where: { adminId: req.session.user.id, groupId: req.params.id },
    attributes: ['id', 'name', 'type', 'groupId', 'miniature', 'createdAt', 'visibility', 'adult', 'ai'],
    include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl'] }, { model: models.groupsfiles, attributes: ['id', 'name'] }],
    order: [['createdAt', 'DESC']]
  })
    .then((promise) => {
      return res.status(200).json(promise)
    })
}

exports.UpdateMyfilesGroup = async (req, res, next) => {
  await File.update({ groupId: req.body.id }, { where: { id: req.body.array } })
    .then(() => { return res.status(200).json({ message: 'changed' }) })
}

exports.UpdateFilesGroup = async (req, res, next) => {
  await File.update({ ...req.body.value }, { where: { id: req.body.array } })
    .then(() => { return res.status(200).json({ message: 'changed' }) })
}


// Image

exports.DeleteMyImage = async (req, res, next) => {
  let json = JSON.parse(req.body.data)
  let filenameArr = [];

  Image.destroy({
    where: {
      imageUrl: json
    }
  })
  await json?.map((img) => {
    const filename = img.split('/uploads/')[1]
    fs.unlink(`uploads/${filename}`, () => { })
  })


  if (req.body.newData.length > 0) {
    // Si des nouveaux fichiers ont été téléchargés, ajoutez-les à la liste d'images
    const newImageUrls = req.body.newData.map((file, index) => {
      return {
        id: file.id,
        order: parseInt(index) + 1,
        imageUrl: file.imageUrl
      }
    });

    filenameArr = filenameArr.concat(newImageUrls);

    // Créez un tableau d'objets pour les mises à jour
    const imageUpdates = newImageUrls.map((file) => ({
      order: file.order
    }));

    // Utilisez Promise.all pour effectuer toutes les mises à jour d'images en parallèle
    await Promise.all(newImageUrls.map((file, index) => {
      return Image.update(imageUpdates[index], { where: { id: file.id } });
    }));
  }


  if (filenameArr[0] != null) {
    await File.update({ miniature: filenameArr[0].imageUrl, imagesCount: parseInt(filenameArr.length) }, { where: { id: req.params.id } })
  } else {
    await File.update({ miniature: null, imagesCount: parseInt(filenameArr.length), ai: null, visibility: null, adult: null, comments: null }, { where: { id: req.params.id } })
  }

  return res.status(200).json({ message: `Management picture has been successfully.` })
}

//tags

exports.GetTagsprofil = async (req, res, next) => {
  await User.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'myTags']
  })
    .then((promise) => {
      return res.status(200).json(promise.dataValues.myTags)
    })
}

exports.GetTags = async (req, res, next) => {
  await User.findOne({
    where: { id: req.session.user.id },
    attributes: ['id', 'myTags']
  })
    .then((promise) => {
      return res.status(200).json(promise.dataValues.myTags)
    })
}

exports.UpdateTags = async (req, res, next) => {
  User.update({ myTags: req.body.tags }, { where: { id: req.session.user.id } })
    .then(() => {
      return res.status(200).json({ message: 'Tag deleted' })
    })
}

//Home Profil

exports.GetNewsfiles = async (req, res, next) => {
  await File.findAll({
    where: { adminId: req.params.id, visibility: 1 },
    attributes: ['id', 'name', 'type', 'miniature', 'data', 'adult', 'createdAt', 'ai', 'imagesCount'],
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
    attributes: ['id', 'name', 'type', 'miniature', 'data', 'adult', 'createdAt', 'ai', 'imagesCount'],
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
      attributes: ['id', 'name', 'type', 'miniature', 'data', 'adult', 'createdAt', 'ai', 'imagesCount'],
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

