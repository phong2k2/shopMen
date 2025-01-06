const express = require("express")
const router = express.Router()

const productController = require("../../app/controllers/v1/ProductController")
const middlewareController = require("../../app/middlewares/authMiddleware")
const { uploadMiddleware } = require("../../app/middlewares/multerMiddleware")

router
  .route("/")
  .get(productController.getAllProducts)
  .post(
    middlewareController.authAdminMiddleWare,
    uploadMiddleware().single("thumbnail"),
    productController.createProduct
  )

router
  .route("/:id")
  .get(productController.getProductDetail)
  .put(
    middlewareController.authAdminMiddleWare,
    uploadMiddleware().single("thumbnail"),
    productController.updateProduct
  )
  .delete(
    middlewareController.authAdminMiddleWare,
    productController.deleteProduct
  )

module.exports = router
