const Sequelize = require('sequelize')
const db = require('../index')
const mahasiswa = require('./mahasiswa')
const mata_kuliah = require('./mata_kuliah')
const { Deferrable } = require('sequelize')


const rencana_studi_mahasiswa = db.sequelize.define('rencana_studi_mahasiswa', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
  },
  mahasiswa_id: {
    type: Sequelize.STRING,
    references: {
      model: mahasiswa,
      key: 'id',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  },
  mata_kuliah_id: {
    type: Sequelize.STRING,
    references: {
      model: mata_kuliah,
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
rencana_studi_mahasiswa.hasOne(mahasiswa, { foreignKey: 'id', sourceKey: 'mahasiswa_id'})
mahasiswa.hasMany(rencana_studi_mahasiswa, { sourceKey: 'id', foreignKey: 'mahasiswa_id'})

rencana_studi_mahasiswa.hasOne(mata_kuliah, { foreignKey: 'id', sourceKey: 'mata_kuliah_id'})
mata_kuliah.hasMany(rencana_studi_mahasiswa, { sourceKey: 'id', foreignKey: 'mata_kuliah_id'})


module.exports = rencana_studi_mahasiswa
