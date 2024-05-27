const File = require('../models/files');
const User = require('../models/user');
const fs = require('fs');
const { Op, Sequelize } = require('sequelize');
let myRegex = new RegExp(/^[0-9a-zA-Z-éçàùè]+$/i);
const { models } = require('../db/mysql');
const Groupsfiles = require('../models/groups_files');
const Image = require('../models/images');


exports.SearchMyfiles = async (req, res, next) => {
  try {
    // Convert the search key to lowercase for case-insensitive search
    const searchValue = req.params.key.toLowerCase();

    // Check if the search key contains special characters
    if (!myRegex.test(req.params.key)) {
      return res.status(400).json({ message: 'Special characters are not supported.' });
    }

    let tags = 'tags';

    // Search for files owned by the current user based on file name or tags
    await File.findAll({
      include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl'] }, { model: models.groupsfiles, attributes: ['id', 'name'] }],
      where: {
        adminId: req.session.user.id,
        [Op.or]: [
          // Search by file name (starts with the search key)
          {
            name: {
              [Op.like]: `${searchValue}%`
            }
          },
          // Search by tags (case-insensitive)
          Sequelize.literal(`LOWER(${tags}) LIKE '%${searchValue}%'`)
        ]
      },
      attributes: ['id', 'name', 'type', 'groupId', 'miniature', 'createdAt', 'visibility', 'ai'],
      order: [['name', 'ASC']],
      limit: 20
    })
      .then(promise => {
        return res.status(200).json(promise);
      });
  } catch (error) {
    // Handle errors if the search page no longer exists or refreshes
    //return res.status(400).json({ message: 'The search page no longer exists or refreshes.' });
    try {
      // Attempt initial error details recording
      const errBuild = System_error.build({
        new: true,
        error_code: 500,
        id_file: 100 + req.session.user.id,
        message: `Search in the Workspace failed`,
        data: req.params.key
      });
      await errBuild.save();
      // Successful recording, return JSON response
      return res.status(200).json(promise);
    } catch (error) {
      // If an error occurs during initial recording, update existing error details
      const errBuild = {
        new: true,
        error_code: 500,
        id_file: 100 + req.session.user.id,
        message: `Search in the Workspace failed`,
        data: req.params.key
      };
      await System_error.update(errBuild, { where: { id_file: id_file } });
      // Successful update, return JSON response
      return res.status(200).json(promise);
    }
  }
};

exports.GetMyfiles = async (req, res, next) => {
  let num = parseInt(req.params.key)
  await File.findAndCountAll({
    include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl'] }, { model: models.groupsfiles, attributes: ['id', 'name'] }],
    where: { adminId: req.session.user.id },
    attributes: ['id', 'name', 'type', 'groupId', 'miniature', 'createdAt', 'visibility', 'ai', 'adult'],
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
    attributes: [
      'id',
      'name',
      'type',
      'data',
      'visibility',
      'miniature',
      'adminId',
      'tags',
      'comments',
      'groupId',
      'adult',
      'ai',
      'allowUserEditTag',
      'dataDescription',
      'shop'],
    include: [{ model: models.images, attributes: ['id', 'imageUrl', 'caption', 'order', 'limited', 'updatedAt', 'createdAt'] }],
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

exports.CreateFile = async (req, res, next) => {
  if (req.body.name == '' || req.body.type == null) {
    return res.status(400).json({ message: 'please fill in all fields.' })
  }

  const build = File.build({
    adminId: req.session.user.id,
    name: req.body.name,
    type: req.body.type,
    groupId: req.body.groupId,
    dateRework: new Date()
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
          limited: 3,
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
    File.findOne({ where: { id: req.params.id } })
      .then(async (promise) => {
        if (!promise) {
          // Supprimer les fichiers en cas de promesse non trouvée
          await req.files?.map((img) => {
            fs.unlink(`uploads/${img.filename}`, () => { });
          });
        }
      })
  }
};


exports.UpdateArticle = async (req, res, next) => {
  if (req.body.name == '') {
    return res.status(400).json({ message: 'Name cannot be empty' });
  }
  //if (req.body.adult == null || req.body.visibility == null || req.body.ai == null || req.body.comments == null) {
  //  return res.status(400).json({ message: 'please fill in all fields require' });
  //}
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
        Image.update(imageUpdates[index], { where: { id: file.id } });
      }))
      if (req.body.adult == null || req.body.visibility == null || req.body.ai == null || req.body.comments == null) {
        const buildImg = {
          name: req.body.name,
          data: req.body.data,
          tags: req.body.tags,
          miniature: req.body.miniature,
          imagesCount: req.body.imagesCount,
          allowUserEditTag: req.body.allowUserEditTag,
          dataDescription: req.body.dataDescription,
          dateRework: new Date()
        }
        await File.update(buildImg, { where: { id: req.params.id } });
        return res.status(200).json({ message: 'Only the order of the images and the non-mandatory part of the form have been changed.' });
      }
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
      allowUserEditTag: req.body.allowUserEditTag,
      dataDescription: req.body.dataDescription,
      dateRework: new Date()
    }

    await File.update(build, { where: { id: req.params.id } });
    return res.status(200).json({ message: 'Management picture has been successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating article', error: error });
  }
};

exports.fileDelete = async (req, res, next) => {
  const file = await File.findOne({ where: { id: req.params.id, shop: 0 } })
  console.log(file);
  if (!file) {
    return res.status(400).json({ message: 'You must remove this file from the accessPass before deleting' });
  }
  await Image.findAll({ where: { fileId: req.params.id } })
    .then(async (promise) => {
      await promise?.map((img) => {
        const filename = img.imageUrl.split('/uploads/')[1]
        fs.unlink(`uploads/${filename}`, () => { })
      })

      await File.destroy({ where: { id: req.params.id, shop: 0 } })
        .then(() => {
          return res.status(200).json({ message: 'File deleted' });
        })
    })

}

// groupsSection

exports.GetOneGroup = async (req, res, next) => {
  await Groupsfiles.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'name', 'imageUrl', 'groupTags', 'data'],
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
  if (req.body.name.length < 3) {
    return res.status(400).json({ message: 'The name is too short.' })
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
    .then((promise) => {

      const bodyBuild = req.file ?
        {
          ...req.body,
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
          ...req.body
        };

      if (promise._previousDataValues.imageUrl == null || bodyBuild.image == promise._previousDataValues.imageUrl) {
        Groupsfiles.update({ ...bodyBuild }, { where: { id: req.params.id } })
          .then(() => { return res.status(200).json({ message: 'user changed' }); })
      } else {
        if (bodyBuild.image == promise._previousDataValues.imageUrl || bodyBuild.image != null) {
          const filename = promise.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Groupsfiles.update({ ...bodyBuild, imageUrl: null }, { where: { id: req.params.id } })
              .then(() => { return res.status(200).json({ message: 'user changed' }); })
          });
        } else {
          const filename = promise.imageUrl.split('/images/')[1];
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
  await File.findAll({
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


exports.DeleteGroup = async (req, res, next) => {
  await Groupsfiles.findOne({ where: { id: req.params.id }, attributes: ['imageUrl'] })
    .then((promise) => {
      if (promise.imageUrl) {
        const filename = promise.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          File.update({ groupId: null }, { where: { groupId: req.params.id } })
            .then(() => {
              Groupsfiles.destroy({ where: { id: req.params.id } })
                .then(() => {
                  return res.status(200).json({ message: 'Group deleted' });
                })
            });
        })
      } else {
        File.update({ groupId: null }, { where: { groupId: req.params.id } })
          .then(() => {
            Groupsfiles.destroy({ where: { id: req.params.id } })
              .then(() => {
                return res.status(200).json({ message: 'Group deleted' });
              })
          })
      }
    })

}

exports.DeleteGroupAndFiles = async (req, res, next) => {

  await File.findAll({ where: { groupId: req.params.id }, attributes: ['id'] })
    .then((promise) => {

      promise.map((file) => (
        Image.findAll({ where: { fileId: file.id }, attributes: ['id', 'imageUrl'] })
          .then((promiseImage) => {
            promiseImage.map((image) => (
              fs.unlink(`uploads/${image.imageUrl.split('/uploads/')[1]}`, () => {
                Image.destroy({ where: { id: image.id } })
              })
            ));
          })
      ));


      promise.map((file) => (
        File.destroy({ where: { id: file.id } })
      ));

      Groupsfiles.findOne({ where: { id: req.params.id }, attributes: ['imageUrl'] })
        .then((promise) => {
          if (promise.imageUrl) {
            const filename = promise.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
              Groupsfiles.destroy({ where: { id: req.params.id } })
                .then(() => {
                  return res.status(200).json({ message: 'Group deleted' });
                })
            })
          } else {
            Groupsfiles.destroy({ where: { id: req.params.id } })
              .then(() => {
                return res.status(200).json({ message: 'Group deleted' });
              })
          }
        })
    })

}

// Image

exports.DeleteMyImage = async (req, res, next) => {
  let json = JSON.parse(req.body.data)
  let filenameArr = [];

  await Image.findAll({
    where: { id: json }
  })
    .then((prom) => {
      Promise.all(prom.map((file, index) => {
        Image.destroy({
          where: {
            id: file.id
          }
        })
        //json?.map((img) => {
        const filename = file.imageUrl.split('/uploads/')[1]
        fs.unlink(`uploads/${filename}`, () => { })
        //})
      }))
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

exports.ImgLimit = async (req, res, next) => {
  if (req.body.imgsListId.length === 0) {
    return res.status(400).json({ message: 'Select Images.' });
  }

  try {
    await Promise.all(req.body.imgsListId.map(async (id) => {
      const updateValues = {
        limited: req.body.limited
      };
      await Image.update(updateValues, { where: { id: id } });
    }));

    const img = await Image.findOne({
      where: { fileId: req.params.id, limited: 1 }
    });

    if (req.body.limited === 1) {
      if (img) {
        await File.update({ diamond: true }, { where: { id: req.params.id } });
      }
    } else {
      if (!img) {
        await File.update({ diamond: false }, { where: { id: req.params.id } });
      }
    }

    return res.status(200).json({ message: 'La gestion des images a été effectuée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des images :', error);
    return res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour des images.' });
  }
}

//tags

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
