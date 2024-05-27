'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('pinned-files', {
      fields: ['fileId'],
      type: 'foreign key',
      name: 'associate_pinned_files_file',
      references: {
        table: 'files',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('pinned-files', {
      fields: ['fileId'],
      type: 'foreign key',
      name: 'associate_pinned_files_file',
      references: {
        table: 'files',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  }
};
