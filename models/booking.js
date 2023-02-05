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
    }
  }
  booking.init({
    date: DataTypes.DATE,
    id_user: DataTypes.INTEGER,
    people: DataTypes.INTEGER,
    message: DataTypes.STRING,
    phone: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    meal: DataTypes.STRING




    
  }, {
    sequelize,
    modelName: 'booking',
  });
  return booking;
};

