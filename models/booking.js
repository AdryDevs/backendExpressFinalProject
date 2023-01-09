'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      booking.belongsTo(models.user, { foreignKey: 'id' });
      booking.belongsTo(models.table, { foreignKey: 'id' });
      booking.belongsTo(models.meal, { foreignKey: 'id' });
    }
  }
  booking.init({
    date: DataTypes.DATE,
    table: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    id_table: DataTypes.INTEGER,
    id_meal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'booking',
  });
  return booking;
};

