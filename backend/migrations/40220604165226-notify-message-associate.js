'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('notify_messages', {
      fields: ['sessionUserId'],
      type: 'foreign key',
      name: 'associate_notify_messages',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('notify_messages', {
      fields: ['sessionUserId'],
      type: 'foreign key',
      name: 'associate_notify_messages',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  }
};
