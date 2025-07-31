'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.User, { foreignKey: "senderId", as: "Sender" })
      Message.belongsTo(models.User, { foreignKey: "receiverId", as: "Receiver" })
    }
  }
  Message.init({
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    senderType: {
      type: DataTypes.ENUM('Freelancer', 'Client'),
      allowNull: false,
    },
    receiverType: {
      type: DataTypes.ENUM('Freelancer', 'Client'),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};