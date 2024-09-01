'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('mata_kuliah', [{
      id: 'f9675430-0d2b-49e6-96b1-142b18a2ebbf',
      jurusan_id: '550e8400-e29b-41d4-a716-446655440000',
      nama_mata_kuliah: 'Algoritma',
      kode_mata_kuliah: 'ALG',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: '8bd5c501-0330-4312-ba87-8c3a5b0b8ea0',
      jurusan_id: '550e8400-e29b-41d4-a716-446655440000',
      nama_mata_kuliah: 'Database',
      kode_mata_kuliah: 'DTB',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: 'f383a9bc-4090-405a-ad8b-c876a0362a9c',
      jurusan_id: 'e810b0f4-5f8d-4e5a-b328-2446a1db5cb2',
      nama_mata_kuliah: 'Digital Technology',
      kode_mata_kuliah: 'DTG',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: '1560fd6b-5608-43e0-9032-054ce157afc9',
      jurusan_id: 'e810b0f4-5f8d-4e5a-b328-2446a1db5cb2',
      nama_mata_kuliah: 'Search Engine Optimization',
      kode_mata_kuliah: 'SEO',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: '2c9340aa-4743-4177-9172-bb306632e244',
      jurusan_id: '204f86ba-ccb6-401a-b508-373a64e2486d',
      nama_mata_kuliah: 'Akuntansi',
      kode_mata_kuliah: 'AKT',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: '1c2b757b-a84c-4f91-bf6f-84da4640e12c',
      jurusan_id: '204f86ba-ccb6-401a-b508-373a64e2486d',
      nama_mata_kuliah: 'Perbankan',
      kode_mata_kuliah: 'PKA',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('mata_kuliah', null, {});
  }
};
