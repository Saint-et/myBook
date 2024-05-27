const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({ path: "./env/.env" });

const { models } = require('../db/mysql')
const Groupsfiles = require('./groups_files');

// Connection à la Base de donné (DATAbase)
const sequelize = require('../db/mysql');
const User = require('./user');


class File extends Model { }

File.init({
  adminId: {
    type: DataTypes.STRING
  },
  groupId: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.STRING
  },
  data: {
    type: DataTypes.TEXT
  },
  dataDescription: {
    type: DataTypes.TEXT
  },
  miniature: {
    type: DataTypes.STRING
  },
  imagesCount: {
    type: DataTypes.INTEGER
  },
  ai: {
    type: DataTypes.BOOLEAN
  },
  allowUserEditTag: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  comments: {
    type: DataTypes.BOOLEAN
  },
  visibility: {
    type: DataTypes.INTEGER
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
  adult: {
    type: DataTypes.BOOLEAN
  },
  bookMarks: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: null
  },
  shop: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  diamond: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  view: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  viewUsers: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  dateRework: {
    type: DataTypes.DATE
  },
  purchase: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalCoins: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

},
  {
    sequelize,
    modelName: 'files',
    tableName: 'files'
  });

User.hasMany(File, { foreignKey: 'adminId', sourceKey: 'id' });
File.belongsTo(User, { foreignKey: 'adminId', targetKey: 'id' });

Groupsfiles.hasMany(File, { foreignKey: 'groupId', sourceKey: 'id' });
File.belongsTo(Groupsfiles, { foreignKey: 'groupId', targetKey: 'id' });


module.exports = File