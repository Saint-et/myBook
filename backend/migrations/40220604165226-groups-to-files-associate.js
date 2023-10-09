'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('files', {
      fields: ['groupId'],
      type: 'foreign key',
      name: 'groups_to_files_associate',
      references: {
        table: 'groupsfiles',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('files', {
      fields: ['groupId'],
      type: 'foreign key',
      name: 'groups_to_files_associate',
      references: {
        table: 'groupsfiles',
        field: 'id'
      }
    })
  }
};
