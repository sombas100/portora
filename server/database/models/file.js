'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      File.belongsTo(models.Project, { foreignKey: 'projectId' });
    }
  }
  File.init({
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    uploader: {
      type: DataTypes.ENUM('Freelancer', 'Client'),
      allowNull: false
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};