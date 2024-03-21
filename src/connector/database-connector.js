const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    port: process.env.MYSQLDB_PORT,
    user: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_PASSWORD,
    database: process.env.MYSQLDB_DATABASE
})

module.exports = connection;