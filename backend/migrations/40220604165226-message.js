'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('messages', {
      fields: ['discussionId'],
      type: 'foreign key',
      name: 'associate_messages',
      references: {
        table: 'discussions',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('messages', {
      fields: ['discussionId'],
      type: 'foreign key',
      name: 'associate_messages',
      references: {
        table: 'discussions',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  }
};
