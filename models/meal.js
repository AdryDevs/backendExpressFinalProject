'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      meal.hasOne(models.booking, { foreignKey: 'id' });
    }
  }
  meal.init({
    lunch: DataTypes.INTEGER,
    dinner: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'meal',
  });
  return meal;
};