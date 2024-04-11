const express = require("express");
const router = express.Router();

const productController = require("../../app/controllers/admin/ProductController");

router.route("/").get(productController.createProduct);
router.route("/:productId").get(productController.getProductDetail);

module.exports = router;
