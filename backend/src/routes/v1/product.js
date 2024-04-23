const express = require("express");
const router = express.Router();

const productController = require("../../app/controllers/v1/ProductController");
const middlewareController = require("../../app/middlewares/authMiddleware");

router
  .route("/")
  .get(productController.getAllProducts)
  .post(
    middlewareController.authAdminMiddleWare,
    productController.createProduct
  );

router
  .route("/:productId")
  .get(productController.getProductDetail)
  .put(
    middlewareController.authAdminMiddleWare,
    productController.updateProduct
  )
  .delete(
    middlewareController.authAdminMiddleWare,
    productController.deleteProduct
  );

module.exports = router;
