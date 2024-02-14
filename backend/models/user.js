const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({path: "./env/.env"});

const { models } = require('../db/mysql')

// Connection à la Base de donné (DATAbase)
const sequelize = require('../db/mysql');


  class User extends Model {}

  User.init({
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    followers: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    iFollow: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    imageUrlCover: {
      type: DataTypes.STRING
    },
    resizeImageUrlCover: {
      type: DataTypes.INTEGER
    },
    background: {
      type: DataTypes.STRING
    },
    resizeThemeBackground: {
      type: DataTypes.INTEGER
    },
    isAdmin: {
      type: DataTypes.BOOLEAN
    },
    isMaster: {
      type: DataTypes.BOOLEAN
    },
    myTags: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    pinnedUsers: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    adultAccess: {
      type: DataTypes.INTEGER
    },
    premium: {
      type: DataTypes.INTEGER
    },
    private: {
      type: DataTypes.INTEGER,
    },
    filesBookmark: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Ou tout autre type JSON approprié
      defaultValue: [], // Valeur par défaut
      unique: true
    },
  },
  {
  sequelize,
  modelName: 'users',
  tableName: 'users'
  });



module.exports = User