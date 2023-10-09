'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      pseudo: 'Admin',
      email: 'admin@eventv.com',
      password: '$2b$10$vHmfYTTil9p.AFBsyzOwceUC5CwNspYbdNlQ13pY2slmSEk.HUcv.',
      private: true,
      isAdmin: true,
      isMaster: true,
      premium: true,
      adultAccess: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
