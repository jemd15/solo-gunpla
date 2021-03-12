const mysql = require('mysql');
const { promisify } = require('util');

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('DATABASE CONNECTION WAS CLOSED');
    } else if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('DATABASE HAS TO MANY CONNECTIONS');
    } else if (err.code === 'ECONNREFUSED') {
      console.error('DATABASE CONNECTION WAS REFUSED');
    } else if (err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
      console.error('DATABASE CONNECTION TIMEOUT');
    } else {
      console.log(err);
    }
  }

  if (connection) {
    connection.release();
    console.log('DATABASE CONNECTION SUCCEED');
  }
  return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);
pool.getConnection = promisify(pool.getConnection);

module.exports = pool;