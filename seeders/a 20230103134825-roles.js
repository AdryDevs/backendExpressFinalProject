
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hour = date.getHours();
const minute = date.getMinutes();
const second = date.getSeconds();

const createdAt = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
const updatedAt = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        id : 1,
        role_name : 'admin',
        createdAt,
        updatedAt
  },
  {
    id : 2,
    role_name : 'user',
    createdAt,
    updatedAt
  },
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
