const express = require("express");
const API_CONSTANT = require("../constants/api");

const router = express.Router();

router.use(API_CONSTANT.EMPLOYEES, require("./employees.route"));
router.use(API_CONSTANT.PRODUCTS, require("./products.route"));

module.exports = router;