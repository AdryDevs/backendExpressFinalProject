'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        id : 1,
        role_name : 'admin',
        createdAt: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        updatedAt: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
  },
  {
    id : 2,
    role_name : 'user',
    createdAt: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDay()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    updatedAt: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDay()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
  },
  {
    id : 3,
    role_name : 'employee',
    createdAt: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDay()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    updatedAt: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDay()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
  }
], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
