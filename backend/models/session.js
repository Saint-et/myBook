const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({path: "./env/.env"});

const { models } = require('../db/mysql')

// Connection à la Base de donné (DATAbase)
const sequelize = require('../db/mysql');


  class Session extends Model {}

  Session.init({
    sid: {type: DataTypes.STRING},
    expires: {type: DataTypes.DATE},
    data: {type: DataTypes.TEXT},
  },
  {
  sequelize,
  modelName: 'dbsessions',
  tableName: 'dbsessions'
  });



module.exports = Session