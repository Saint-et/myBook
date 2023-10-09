'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('groupsfiles', {
      fields: ['adminId'],
      type: 'foreign key',
      name: 'groups_files_associate',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('groupsfiles', {
      fields: ['adminId'],
      type: 'foreign key',
      name: 'groups_files_associate',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  }
};
