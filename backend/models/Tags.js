const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({path: "./env/.env"});

const { models } = require('../db/mysql')

// Connection à la Base de donné (DATAbase)
const sequelize = require('../db/mysql');


  class Tags extends Model {}

  Tags.init({
    adminId: {
      type: DataTypes.STRING
    },
    mostUsed: {
      type: DataTypes.INTEGER
    },
    tag : {
      type: DataTypes.STRING
    }
  },
  {
  sequelize,
  modelName: 'tags',
  tableName: 'tags'
  });


  module.exports = Tags