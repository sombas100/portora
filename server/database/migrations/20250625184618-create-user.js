'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('Freelancer', 'Admin'),
        allowNull: false,
        defaultValue: 'Freelancer'
      },
      stripeCustomerId: {
      type: Sequelize.STRING,
      allowNull: true,
      },
      subscriptionStatus: {
        type: Sequelize.ENUM('trialing', 'active', 'past_due', 'canceled', 'incomplete'),
        allowNull: true,
      },
      plan: {
        type: Sequelize.ENUM('free', 'starter', 'pro', 'enterprise'),
        allowNull: true,
      },
      subscriptionEndDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};