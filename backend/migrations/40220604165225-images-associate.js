'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('images', {
      fields: ['fileId'],
      type: 'foreign key',
      name: 'images_associate',
      references: {
        table: 'files',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('images', {
      fields: ['fileId'],
      type: 'foreign key',
      name: 'images_associate',
      references: {
        table: 'files',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  }
};
