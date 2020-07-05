/**
 * @name config.js
 * @description provide the default configuration for the application.It will be overriden by respective if required.
 */

module.exports = {
  http: {
    port: process.env.HTTP_PORT || 3000,
  },
  sql: {
    database: process.env.SQL_DATABASE
      ? process.env.SQL_DATABASE + "_" + process.env.NODE_ENV
      : "node_training_dev",
    username: process.env.SQL_USERNAME || "root",
    password: process.env.SQL_PASSWORD,
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    dialect: "postgres",
    enableLogging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
