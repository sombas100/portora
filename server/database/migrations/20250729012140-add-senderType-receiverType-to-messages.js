'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Messages', 'senderType', {
      type: Sequelize.ENUM('Freelancer', 'Client'),
      allowNull: false,
      defaultValue: 'Freelancer',
    });

    await queryInterface.addColumn('Messages', 'receiverType', {
      type: Sequelize.ENUM('Freelancer', 'Client'),
      allowNull: false,
      defaultValue: 'Client',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Messages', 'senderType');
    await queryInterface.removeColumn('Messages', 'receiverType');

    
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_Messages_senderType";`);
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_Messages_receiverType";`);
  }
};

