const { createPool, createConnection } = require ('mysql');
require('dotenv').config()

const pool = createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_database,
    connectionLimit:process.env.DB_connLimit
})

module.exports = pool;

