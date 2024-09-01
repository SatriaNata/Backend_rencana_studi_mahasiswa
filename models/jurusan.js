const Sequelize = require('sequelize')
const db = require('../index.js')
const { Deferrable } = require('sequelize')


const jurusan = db.sequelize.define('jurusan', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
  },
  nama_jurusan: {
    type: Sequelize.STRING
  },
  kode_jurusan: {
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
}, { 
  freezeTableName: true,
})

module.exports =jurusan
