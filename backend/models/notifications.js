const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({path: "./env/.env"});

const { models } = require('../db/mysql')
const User = require('./user');

// Connection à la Base de donné (DATAbase)
const sequelize = require('../db/mysql');


  class Notification extends Model {}

  Notification.init({
    adminId: {
      type: DataTypes.STRING
    },
    notifId: {
      type: DataTypes.STRING
    },
    forUser: {
      type: DataTypes.INTEGER
    },
    data: {
      type: DataTypes.STRING
    }
  },
  {
  sequelize,
  modelName: 'notifications',
  tableName: 'notifications'
  });

  User.hasMany(Notification, {foreignKey: 'adminId', sourceKey: 'id'});
  Notification.belongsTo(User, {foreignKey: 'adminId', targetKey: 'id'});

  module.exports = Notification