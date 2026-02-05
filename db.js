const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '11112222',
  database: 'hotel_db'
});

// test de conexión
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('Conectado a MySQL (pool)');
    connection.release();
  } catch (error) {
    console.error('Error conectando a MySQL:', error.message);
  }
})();

module.exports = db;
