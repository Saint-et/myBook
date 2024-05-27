const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({ path: "./env/.env" });

const { models } = require('../db/mysql')

// Connection à la Base de donné (DATAbase)
const sequelize = require('../db/mysql');


class User extends Model { }

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
  total_followers: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  followers: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  subscriptions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  imageUrl: {
    type: DataTypes.STRING
  },
  imageUrlCover: {
    type: DataTypes.STRING
  },
  resizeImageUrlCover: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isMaster: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  myTags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  pinnedUsers: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  adultAccess: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  premium: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  accessPass: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  diamondPass: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  private: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  coinBack: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  coinBuy: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  coinPurchase: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalCoinPurchase: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  privatePinnedIllustrations: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  privatePinnedUsers: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  filesBookmark: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Ou tout autre type JSON approprié
    defaultValue: [], // Valeur par défaut
    unique: true
  },
  caption: {
    type: DataTypes.TEXT
  }
},
  {
    sequelize,
    modelName: 'users',
    tableName: 'users'
  });



module.exports = User