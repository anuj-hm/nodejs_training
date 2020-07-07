const express = require("express");
const { EmployeesController } = require("../controllers");
const { auth } = require("../middlewares");

const router = express.Router();
const employeesController = new EmployeesController();

router.post("", auth, employeesController.create);
router.get("", employeesController.getAll);
router.get("/:id", employeesController.get);
router.patch("/:id", employeesController.update);
router.delete("/:id", employeesController.delete);

module.exports = router;
