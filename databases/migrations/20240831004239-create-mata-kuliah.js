const { Deferrable } = require('sequelize')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mata_kuliah', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      jurusan_id: {
        type: Sequelize.UUID,
        references: {
          model: 'jurusan',
          key: 'id',
          deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
      },
      nama_mata_kuliah: {
        type: Sequelize.STRING
      },
      kode_mata_kuliah: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mata_kuliah');
  }
};