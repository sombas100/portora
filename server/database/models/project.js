'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.User, { foreignKey: 'userId'} );
      Project.belongsTo(models.Client, { foreignKey:  'clientId' });
      Project.hasMany(models.File, { foreignKey: 'projectId' });
      Project.hasMany(models.Feedback, { foreignKey: 'projectId' });
    }
  }
  Project.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'),
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};