const { Sequelize } = require('sequelize')
const dotenv = require('dotenv').config()
const config = process.env


const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

new Sequelize()

module.exports = sequelize