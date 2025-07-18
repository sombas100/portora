'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'plan', {
      type: Sequelize.ENUM('free', 'starter', 'pro', 'enterprise'),
      allowNull: false,
      defaultValue: 'free',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'plan', {
      type: Sequelize.ENUM('free', 'starter', 'pro', 'enterprise'),
      allowNull: false,
      
    });
  }
};