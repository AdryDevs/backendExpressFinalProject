'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.role, { foreignKey: 'id' });
      user.hasOne(models.timetable, { foreignKey: 'id' });
      user.hasOne(models.booking, { foreignKey: 'id' })
    }
  }
  user.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 20]
    }
  }, 
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
    }
  },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  id_role:{
    type:DataTypes.INTEGER
  },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },{
      sequelize,
    modelName: 'user'
  });
  return user;
};