const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({path: "./env/.env"});

const { models } = require('../db/mysql')
const User = require('./user');

// Connection à la Base de donné (DATAbase)
const sequelize = require('../db/mysql');


  class Discussions extends Model {}

  Discussions.init({
    sessionId: {
      type: DataTypes.NUMBER
    },
    userId: {
      type: DataTypes.NUMBER
    },
    users: {
      type: DataTypes.NUMBER
    }
    ,
    uuId: {
      type: DataTypes.STRING
    }
  },
  {
  sequelize,
  modelName: 'discussions',
  tableName: 'discussions'
  });
  
  User.hasMany(Discussions, {foreignKey: 'userId', sourceKey: 'id'});
  Discussions.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});



module.exports = Discussions