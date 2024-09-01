'use strict';

const fs = require('fs');
const path = require('path');
const {Sequelize} = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const  config = require('./config')
var dialect = 'mysql'
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, config.mysql
);
}
sequelize.authenticate()
.then(() => console.log('Connection success'))
.catch(err => console.error('Connection failed:', err));

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
