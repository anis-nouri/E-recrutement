const { createPool, createConnection } = require ('mysql');
require('dotenv').config()

const pool = createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_database,
    connectionLimit:process.env.DB_connLimit
})

// Attempt to acquire a connection from the pool
pool.getConnection((error, connection) => {
    if (error) {
      console.error('Error connecting to the database:', error);
      return;
    }
  
    console.log('Connected to the database');
    
    // Release the connection back to the pool
    connection.release();
  });

module.exports = pool;

