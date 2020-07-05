const dbConfig = require("./index");
module.exports = {
  dev: {
    username: dbConfig.sql.username,
    password: dbConfig.sql.password,
    database: dbConfig.sql.database,
    host: dbConfig.sql.host,
    dialect: dbConfig.sql.dialect,
  },
};
