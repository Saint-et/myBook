const { models } = require('../db/mysql')
const { Op } = require('sequelize');
const Discussion = require("../models/groups_discussion");
const Messages = require('../models/groups_message');
const { v4: uuidv4 } = require('uuid');
const NotificationMessage = require('../models/notificationsMessage');


exports.createDiscussion = (req, res, next) => {
    let test = uuidv4()


    const build = Discussion.build({
        sessionId: req.session.user.id,
        userId: req.body.userId,
        users: `${req.session.user.id}${req.body.userId}`,
        uuId : test
      })
      const build2 = Discussion.build({
        sessionId: req.body.userId,
        userId: req.session.user.id,
        users:  `${req.body.userId}${req.session.user.id}`,
        uuId : test
      })
      build.save()
      .then(() => {
      build2.save()
      .then(() => res.status(200).json({ message: `Discussion created.` }))
      .catch((err) => res.status(400).json( err ))
      })
      .catch(() => res.status(400).json({ message: `Discussion not created.` }))
      
}

exports.getDiscussion = (req, res, next) => {
    Discussion.findAll({where :{ sessionId: req.session.user.id }, attributes: ['id','sessionId','userId','updatedAt'],
    order: [['updatedAt', 'DESC']],
    include: [{model: models.users, attributes: ['id','pseudo','imageUrl','premium']}]})
    .then((promise) => {
        return res.status(200).json({ promise })
    })
}

exports.getOneDiscussion = (req, res, next) => {
    Discussion.findOne({where :{ id: req.params.id }, attributes: ['id','sessionId','userId','uuId','users','updatedAt'],
    order: [['updatedAt', 'DESC']],
    include: [{model: models.users, attributes: ['id','pseudo','imageUrl','premium','imageUrlCover','resizeImageUrlCover']}]})
    .then((promise) => {
        if (req.session.user.id !== promise.dataValues.sessionId) {
            return res.status(400).json({ message: `You do not have access to this page.` })
        }
        return res.status(200).json({ promise })
    })
    .catch(() => {res.status(400).json({ message: `This discussion no longer exists or has been closed.` })})
}

exports.postOneMessage = (req, res, next) => {
    if (req.body.id === null) {
        Discussion.findOne({where :{ uuId: req.body.uuId, userId: req.body.userId }})
        .then((promise) => {
            if (promise === null) {
                return res.status(400).json({ message: `This discussion has been closed.` })
            }
            const build = Messages.build({
                discussionId: promise.dataValues.id,
                text: req.body.text,
                uuId: req.body.uuId,
                userId: req.session.user.id,
                imageUrl: req.body.imageUrl
              })
              build.save()
            .then(() => {res.status(200).json({ message: `Message created.` })})
            .catch(() => res.status(400).json({ message: `Message not created.` }))
        })
    } else {
    const build = Messages.build({
        discussionId: req.body.id,
        text: req.body.text,
        uuId: req.body.uuId,
        userId: req.session.user.id,
        imageUrl: req.body.imageUrl
      })
    build.save()
      .then(() => {res.status(200).json({ message: `Message created.` })})
      .catch(() => {res.status(400).json({ message: `Message not created.` })})
    }
}

exports.getMessage = (req, res, next) => {
    Messages.findAll({where :{ uuId: req.params.id }, attributes: ['id','text','updatedAt'],
    order: [['updatedAt', 'DESC']],
    include: [{model: models.users, attributes: ['id','pseudo','imageUrl','imageUrlCover','email','private','isAdmin','premium','resizeImageUrlCover','adultAccess']}]})
    .then((promise) => {
        return res.status(200).json({ promise })
    })
}

exports.deleteDiscution = (req, res, next) => {
    Discussion.destroy({ where: { uuId: req.params.id }});
    NotificationMessage.destroy({ where: { uuId: req.params.id }});
    return res.status(200).json({ message: 'user deleted' });
}