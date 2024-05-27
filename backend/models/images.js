const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({ path: "./env/.env" });

const { models } = require('../db/mysql')

// Connection à la Base de donné (DATAbase)
const sequelize = require('../db/mysql');
const File = require('./files');


class Image extends Model { }

Image.init({
  imageUrl: {
    type: DataTypes.STRING
  },
  caption: {
    type: DataTypes.TEXT
  },
  fileId: {
    type: DataTypes.NUMBER
  },
  order: {
    type: DataTypes.NUMBER
  },
  limited: {
    type: DataTypes.NUMBER,
    defaultValue: 0
  }
},
  {
    sequelize,
    modelName: 'images',
    tableName: 'images'
  });

File.hasMany(Image, { foreignKey: 'fileId', sourceKey: 'id' });
Image.belongsTo(File, { foreignKey: 'fileId', targetKey: 'id' });



module.exports = Image