const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({ path: "./env/.env" });

const { models } = require('../db/mysql')


// Connection à la Base de donné (DATAbase)
const sequelize = require('../db/mysql');
const User = require('./user');
const File = require('./files');


class Pinned_files extends Model { }

Pinned_files.init({
  userId: {
    type: DataTypes.INTEGER
  },
  fileId: {
    type: DataTypes.INTEGER
  },
},
  {
    sequelize,
    modelName: 'pinned-files',
    tableName: 'pinned-files'
  });

User.hasMany(Pinned_files, { foreignKey: 'userId', sourceKey: 'id' });
Pinned_files.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

File.hasMany(Pinned_files, { foreignKey: 'fileId', sourceKey: 'id' });
Pinned_files.belongsTo(File, { foreignKey: 'fileId', targetKey: 'id' });


module.exports = Pinned_files