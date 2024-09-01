const Sequelize = require('sequelize')
const db = require('../index')
const jurusan = require('./jurusan')
const { Deferrable } = require('sequelize')

const mata_kuliah = db.sequelize.define('mata_kuliah', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
  },
  jurusan_id: {
    type: Sequelize.STRING,
    references: {
      model: jurusan,
      key: 'id',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  },
  nama_mata_kuliah: {
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
  freezeTableName: true
})

mata_kuliah.hasOne(jurusan, { foreignKey: 'id', sourceKey: 'jurusan_id' })
jurusan.hasMany(mata_kuliah, { sourceKey: 'id', foreignKey: 'jurusan_id' })

module.exports = mata_kuliah
