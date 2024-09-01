const { Deferrable } = require('sequelize')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rencana_studi_mahasiswa', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      mahasiswa_id: {
        type: Sequelize.UUID,
        references: {
          model: 'mahasiswa',
          key: 'id',
          deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
      },
      mata_kuliah_id: {
        type: Sequelize.UUID,
        references: {
          model: 'mata_kuliah',
          key: 'id',
          deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
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
    await queryInterface.dropTable('rencana_studi_mahasiswa');
  }
};