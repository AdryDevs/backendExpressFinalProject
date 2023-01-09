'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      table: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      id_user: {
        type: Sequelize.INTEGER
      },
      id_table: {
        type: Sequelize.INTEGER
      },
      id_meal: {
        type: Sequelize.INTEGER
      }
    });
    await queryInterface.addConstraint('bookings', {
      fields: ['id_user'],
      type: 'foreign key',
      name: 'fk_booking_user',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
      await queryInterface.addConstraint('bookings', {
      fields: ['id_table'],
      type: 'foreign key',
      name: 'fk_booking_table',
      references: {
        table: 'tables',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
      await queryInterface.addConstraint('bookings', {
      fields: ['id_meal'],
      type: 'foreign key',
      name: 'fk_booking_meal',
      references: {
        table: 'meals',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bookings');
  }
};