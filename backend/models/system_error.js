const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({ path: "./env/.env" });

const { models } = require('../db/mysql')

// Connection à la Base de donné (DATAbase)
const sequelize = require('../db/mysql');
const User = require('./user');


class System_error extends Model { }

System_error.init({
  unique_id: { type: DataTypes.INTEGER },
  error_code: { type: DataTypes.INTEGER },
  userId: { type: DataTypes.INTEGER },
  message: { type: DataTypes.TEXT }
},
  {
    sequelize,
    modelName: 'system_error',
    tableName: 'system_error'
  });


User.hasMany(System_error, { foreignKey: 'userId', sourceKey: 'id' });
System_error.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

module.exports = System_error
