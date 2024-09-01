const Sequelize = require('sequelize')
const db = require('../index')
const { Deferrable } = require('sequelize')

const mahasiswa = db.sequelize.define('mahasiswa', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
    },
    nim: {
        type: Sequelize.STRING,
    },
    nama: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
    },
    no_hp: {
        type: Sequelize.STRING,
    },
    alamat: {
        type: Sequelize.STRING,
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
},
    {
        freezeTableName: true,
    }
)

module.exports = mahasiswa
