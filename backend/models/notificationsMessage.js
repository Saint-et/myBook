const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({path: "./env/.env"});

const { models } = require('../db/mysql')

// Connection à la Base de donné (DATAbase)
const sequelize = require('../db/mysql');


  class NotificationMessage extends Model {}

  NotificationMessage.init({
    sessionUserId: {
      type: DataTypes.NUMBER
    },
    uuId: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.NUMBER
    },
    users: {
      type: DataTypes.NUMBER
    },
    text: {
      type: DataTypes.TEXT
    }
  },
  {
  sequelize,
  modelName: 'notify_messages',
  tableName: 'notify_messages'
  });

  sequelize.models.users.hasMany(NotificationMessage, {foreignKey: 'sessionUserId', sourceKey: 'id'});
  NotificationMessage.belongsTo(sequelize.models.users, {foreignKey: 'sessionUserId', targetKey: 'id'});

  module.exports = NotificationMessage