const Notification = require("../models/notifications");
const NotificationMessage = require("../models/notificationsMessage");


const { models } = require('../db/mysql');


exports.GetMynotif = (req, res, next) => {
    Notification.findAll({where: {forUser: req.session.user.id},
      attributes: ['id','data','notifId','adminId','updatedAt'],
      order: [['updatedAt', 'DESC']],
      include: [{model: models.users, attributes: ['id','pseudo','imageUrl']}]
    }).then((promise) => {
      return res.status(200).json(promise)
  })
  }

  exports.notifDelete = (req, res, next) => {
    Notification.destroy({ where: { notifId: req.params.id }});
            return res.status(200).json({ message: 'Notif deleted' });
  }

  exports.notifAllDelete = (req, res, next) => {
    Notification.destroy({ where: { forUser: req.session.user.id }});
            return res.status(200).json({ message: 'Notif deleted' });
  }

  exports.GetMynotifMessage = (req, res, next) => {
    NotificationMessage.findAll({where: {userId: req.session.user.id},
      attributes: ['id','uuId','text','userId','sessionUserId','updatedAt'],
      order: [['updatedAt', 'DESC']],
      include: [{model: models.users, attributes: ['id','pseudo','imageUrl']}]
    }).then((promise) => {
      return res.status(200).json(promise)
  })
  }

  exports.DeleteMynotifMessage = (req, res, next) => {
    NotificationMessage.destroy({ where: { uuId: req.params.id }});
            return res.status(200).json({ message: 'Notif deleted' });
  }

  exports.MessageAllDelete = (req, res, next) => {
    NotificationMessage.destroy({ where: { userId: req.session.user.id }});
            return res.status(200).json({ message: 'Notif deleted' });
  }