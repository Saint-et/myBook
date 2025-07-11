'use strict';

const { sequelize } = require("../models/user");


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      imageUrlCover: {
        type: Sequelize.STRING,
      },
      resizeImageUrlCover: {
        type: Sequelize.INTEGER,
      },
      pseudo: {
        type: Sequelize.STRING,
      },
      premium: {
        type: Sequelize.STRING,
      },
      adultAccess: {
        type: Sequelize.INTEGER,
      },
      total_followers: {
        type: Sequelize.INTEGER,
      },
      followers: {
        type: Sequelize.JSON,
      },
      subscriptions: {
        type: Sequelize.JSON
      },
      isAdmin: {
        type: Sequelize.INTEGER,
      },
      isMaster: {
        type: Sequelize.INTEGER,
      },
      private: {
        type: Sequelize.INTEGER,
      },
      privatePinnedIllustrations: {
        type: Sequelize.INTEGER,
      },
      privatePinnedUsers: {
        type: Sequelize.INTEGER,
      },
      accessPass: {
        type: Sequelize.INTEGER,
      },
      diamondPass: {
        type: Sequelize.INTEGER,
      },
      myTags: {
        type: Sequelize.JSON
      },
      pinnedUsers: {
        type: Sequelize.JSON
      },
      filesBookmark: {
        type: Sequelize.JSON
      },
      caption: {
        type: Sequelize.TEXT,
      },
      coinBack: {
        type: Sequelize.INTEGER,
      },
      coinBuy: {
        type: Sequelize.INTEGER,
      },
      totalCoinPurchase: {
        type: Sequelize.INTEGER,
      },
      coinPurchase: {
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
    await queryInterface.dropTable('users');
  }
};