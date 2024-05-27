'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('system_error', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      unique_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      error_code: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.TEXT
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('system_error');
  }
};