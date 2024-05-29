'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const defaultPasswd = require('bcrypt').hashSync('123456', 10)
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin1@mail.com',
        is_admin: true,
        password: defaultPasswd,
        is_verified: true,
        fullname: 'Admin 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'admin2@mail.com',
        is_admin: true,
        password: defaultPasswd,
        is_verified: true,
        fullname: 'Admin 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user1@mail.com',
        is_admin: false,
        password: defaultPasswd,
        is_verified: true,
        fullname: 'User 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user2@mail.com',
        is_admin: false,
        password: defaultPasswd,
        is_verified: true,
        fullname: 'User 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
