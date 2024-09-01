'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('mahasiswa', [{
      id: '299d8047-5399-47bc-8562-67b02bec8e3f',
      nim: '1815110666',
      nama: 'Satria N',
      email: 'satria@gmail.com',
      no_hp: '081223222331',
      alamat: "Bandung",
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: '515afa40-2f6b-4860-9cc1-74d91eadf4ac',
      nim: '1815110677',
      nama: 'Zulfikar R',
      email: 'zulfi@gmail.com',
      no_hp: '082132423330',
      alamat: 'jakarta',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('mahasiswa', null, {});
  }
};
