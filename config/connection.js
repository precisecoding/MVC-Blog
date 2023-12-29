const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// process.env.VARIABLEDB_URL connects the server to the database may need may not depends if URL encoding is being implemented
if (process.env.VARIABLEDB_URL) { 
  sequelize = new Sequelize(process.env.VARIABLEDB_URL);
} else {
  // sequelize variables to allow access to database
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      // allows for either server to connect with process.env.host if deployed and if not deployed use 'localhost' 
      host: process.env.host || 'localhost',
      dialect: 'mysql',
      port: process.env.port || 3306
    }
    // method to put host, dialect, port in env file

  );
}

module.exports = sequelize;
