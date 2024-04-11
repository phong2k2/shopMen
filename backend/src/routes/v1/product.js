const express = require("express");
const router = express.Router();

const productController = require("../../app/controllers/v1/ProductController");

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router
  .route("/:productId")
  .get(productController.getProductDetail)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
