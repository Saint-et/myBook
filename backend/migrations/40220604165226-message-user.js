'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('messages', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'associate_messages_user',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('messages', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'associate_messages_user',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  }
};
