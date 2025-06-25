'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Client, { foreignKey: 'userId' });
      User.hasMany(models.Project, { foreignKey: 'userId' });
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('Freelancer', 'Admin'),
      allowNull: false,
      defaultValue: 'Freelancer',
    },
    stripeCustomerId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subscriptionStatus: {
      type: DataTypes.ENUM('trialing', 'active', 'past_due', 'canceled', 'incomplete'),
      allowNull: true,
    },
    plan: {
      type: DataTypes.ENUM('free', 'starter', 'pro', 'enterprise'),
      allowNull: true,
    },
    subscriptionEndDate: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
