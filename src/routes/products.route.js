// const express = require('express');
// const { productController } = require('../controllers');
// const router = express.Router();

// router.get('', productController.getProducts);
// router.get('/:name', productController.searchProduct);

// module.exports = router;


const express = require("express");
const { ProductsController } = require("../controllers");
const { auth } = require("../middlewares");

const router = express.Router();
const productsController = new ProductsController();

router.post("", productsController.create);
router.get("", productsController.getAll);
router.get("/:id", productsController.get);
router.patch("/:id", productsController.update);
router.delete("/:id", productsController.delete);

module.exports = router;
