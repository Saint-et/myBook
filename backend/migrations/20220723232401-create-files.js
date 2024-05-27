'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      adminId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      groupId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      ai: {
        type: Sequelize.INTEGER,
      },
      allowUserEditTag: {
        type: Sequelize.INTEGER,
      },
      miniature: {
        type: Sequelize.STRING,
      },
      comments: {
        type: Sequelize.INTEGER,
      },
      imagesCount: {
        type: Sequelize.INTEGER
      },
      bookMarks: {
        type: Sequelize.INTEGER,
      },
      view: {
        type: Sequelize.INTEGER,
      },
      viewUsers: {
        type: Sequelize.JSON,
      },
      data: {
        type: Sequelize.TEXT,
      },
      dataDescription: {
        type: Sequelize.TEXT,
      },
      visibility: {
        type: Sequelize.INTEGER,
      },
      tags: {
        type: Sequelize.JSON,
      },
      adult: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      shop: {
        type: Sequelize.INTEGER,
      },
      diamond: {
        type: Sequelize.INTEGER,
      },
      dateRework: {
        allowNull: false,
        type: Sequelize.DATE
      },
      purchase: {
        type: Sequelize.INTEGER,
      },
      totalCoins: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('files');
  }
};