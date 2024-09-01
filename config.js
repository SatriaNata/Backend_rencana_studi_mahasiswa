require('dotenv').config()
const {Sequelize} = require('sequelize')
const { env } = process, 
{ 
    MYSQL_HOST, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DB, DB_NAME, MYSQL_PORT
} = env

var config = {
    mysql: {
        database: DB_NAME,
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        username: MYSQL_USERNAME,
        password: MYSQL_PASSWORD,
        define: {
            charset: "utf8mb4_bin",
            underscored: true,
            underscoredAll: true
        },
        dialect: 'mysql',
        transactionType: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
    }
}
module.exports = config
