const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({ path: "./env/.env" });

const { models } = require('../db/mysql')
const User = require('./user');

// Connection à la Base de donné (DATAbase)
const sequelize = require('../db/mysql');


class Groupsfiles extends Model { }

Groupsfiles.init({
  adminId: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  data: {
    type: DataTypes.TEXT
  },
  imageUrl : {
    type: DataTypes.STRING
  },
  groupTags: {
    type: DataTypes.STRING
  }
},
  {
    sequelize,
    modelName: 'groupsfiles',
    tableName: 'groupsfiles'
  });

User.hasMany(Groupsfiles, { foreignKey: 'adminId', sourceKey: 'id' });
Groupsfiles.belongsTo(User, { foreignKey: 'adminId', targetKey: 'id' });

module.exports = Groupsfiles