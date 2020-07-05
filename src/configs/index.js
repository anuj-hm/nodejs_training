/**
 * @name index.js
 * @description Provide the config for different environment
 */

require("dotenv").config();

const env = process.env.NODE_ENV || "dev";
const path = `./${env}.js`;

module.exports = require(path);
