/**
 * @name: DbConnection.js
 * @description: Create and return db connection
 * @author: Anuj Gupta
 */

const Sequelize = require("sequelize");
const config = require("../../configs");

let dbInstance;

/**
 * Db connection
 */
class DbConnection {
  constructor() {
    if (dbInstance) {
      return dbInstance;
    } else {
      return this.createConnection();
    }
  }

  createConnection() {
    dbInstance = new Sequelize(
      config.sql.database,
      config.sql.username,
      config.sql.password,
      {
        host: config.sql.host,
        port: config.sql.port,
        dialect: config.sql.dialect,
        storage: config.sql.storage || null,
        logging: config.sql.enableLogging,
        dialectOptions: { decimalNumbers: true },
        pool: config.sql.pool,
      }
    );
    return dbInstance;
  }
}

module.exports = new DbConnection();
