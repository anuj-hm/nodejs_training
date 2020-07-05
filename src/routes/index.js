const express = require("express");
const API_CONSTANT = require("../constants/api");

const router = express.Router();

router.use(API_CONSTANT.EMPLOYEES, require("./employees.route"));

module.exports = router