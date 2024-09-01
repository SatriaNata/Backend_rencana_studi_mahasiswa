'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('jurusan', [{
      id: '550e8400-e29b-41d4-a716-446655440000',
      nama_jurusan: 'Informatika',
      kode_jurusan: 'IF',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: '4d4b0a5a-d213-435c-a69a-82dfed45a152',
      nama_jurusan: 'Management Aset',
      kode_jurusan: 'MA',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: 'e810b0f4-5f8d-4e5a-b328-2446a1db5cb2',
      nama_jurusan: 'Digital Marketing',
      kode_jurusan: 'DM',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: '204f86ba-ccb6-401a-b508-373a64e2486d',
      nama_jurusan: 'Akuntansi',
      kode_jurusan: 'AK',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('jurusan', null, {});
  }
};