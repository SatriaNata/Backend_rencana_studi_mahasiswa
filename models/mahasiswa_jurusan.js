const Sequelize = require('sequelize')
const db = require('../index.js')
const mahasiswa = require('./mahasiswa.js')
const jurusan = require('./jurusan.js')
const { Deferrable } = require('sequelize')


const mahasiswa_jurusan = db.sequelize.define('mahasiswa_jurusan', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
},
mahasiswa_id: {
    type: Sequelize.STRING,
    references: {
      model: 'mahasiswa',
      key: 'id',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
},
jurusan_id: {
    type: Sequelize.STRING,
    references: {
      model: 'jurusan',
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
}, { 
  freezeTableName: true,
})

module.exports = mahasiswa_jurusan
