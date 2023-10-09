const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({path: "./env/.env"});

const { models } = require('../db/mysql')
const User = require('./user');
const Discussions = require('./groups_discussion');

// Connection à la Base de donné (DATAbase)
const sequelize = require('../db/mysql');



  class Messages extends Model {}

  Messages.init({
    discussionId: {
      type: DataTypes.NUMBER
    },
    uuId: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.NUMBER
    },
    text: {
      type: DataTypes.TEXT
    },
    imagesUrl: {
      type: DataTypes.STRING
    }
  },
  {
  sequelize,
  modelName: 'messages',
  tableName: 'messages'
  });

  User.hasMany(Messages, {foreignKey: 'userId', sourceKey: 'id'});
  Messages.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});

  Discussions.hasMany(Messages, {foreignKey: 'discussionId', sourceKey: 'id'});
  Messages.belongsTo(Discussions, {foreignKey: 'discussionId', targetKey: 'id'});

module.exports = Messages