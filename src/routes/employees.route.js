const express = require("express");
const { EmployeesController } = require("../controllers");

const router = express.Router();
const employeesController = new EmployeesController();

router.post("", employeesController.create);
router.get("", employeesController.getAll);
router.get("/:id", employeesController.get);
router.patch("/:id", employeesController.update);
router.delete("/:id", employeesController.delete);

module.exports = router;
