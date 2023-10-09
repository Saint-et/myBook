const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({path: "./env/.env"});

const { models } = require('../db/mysql')

// Connection à la Base de donné (DATAbase)
const sequelize = require('../db/mysql');
const User = require('./user');


  class Token extends Model {}

  Token.init({
    expires: {type: DataTypes.DATE},
    token: {type: DataTypes.TEXT},
    userId: {type: DataTypes.INTEGER},
    used: {type: DataTypes.BOOLEAN}
  },
  {
  sequelize,
  modelName: 'dbtoken',
  tableName: 'dbtoken'
  });

  User.hasMany(Token, { foreignKey: 'userId', sourceKey: 'id' });
  Token.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

module.exports = Token