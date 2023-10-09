'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('discussions', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'associate_discussions',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('discussions', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'associate_discussions_userId',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  }
};
