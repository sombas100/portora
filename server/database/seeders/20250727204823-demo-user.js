'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Josh',
        email: 'example@gmail.com',
        password: 'test',
        role: 'Freelancer',
        stripeCustomerId: null,
        subscriptionStatus: 'active',
        plan: 'pro',
        subscriptionEndDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
