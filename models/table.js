'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      table.hasOne(models.booking, { foreignKey: 'id' });
    }
  }
  table.init({
    people: DataTypes.INTEGER,
    id_booking: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'table',
  });
  return table;
};