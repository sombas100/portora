"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.removeConstraint("Messages", "Messages_senderId_fkey");

   
    await queryInterface.removeConstraint("Messages", "Messages_receiverId_fkey");
  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.addConstraint("Messages", {
      fields: ["senderId"],
      type: "foreign key",
      name: "Messages_senderId_fkey",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("Messages", {
      fields: ["receiverId"],
      type: "foreign key",
      name: "Messages_receiverId_fkey",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },
};
