const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({ path: "./env/.env" });


// Connection à la Base de donné (DATAbase)
const sequelize = require('../db/mysql');
const User = require('./user');


class Posts extends Model { }

Posts.init({
  adminId: {
    type: DataTypes.STRING
  },
  title: {
    type: DataTypes.STRING
  },
  imageUrl: {
    type: DataTypes.STRING
  },
  comments: {
    type: DataTypes.INTEGER
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
  data: {
    type: DataTypes.TEXT
  }

},
  {
    sequelize,
    modelName: 'posts',
    tableName: 'posts'
  });

User.hasMany(Posts, { foreignKey: 'adminId', sourceKey: 'id' });
Posts.belongsTo(User, { foreignKey: 'adminId', targetKey: 'id' });


module.exports = Posts