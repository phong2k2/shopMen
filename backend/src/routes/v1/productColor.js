const express = require("express")
const router = express.Router()

const productColorController = require("../../app/controllers/v1/ProductColorController")
const middlewareController = require("../../app/middlewares/authMiddleware")
const { uploadMiddleware } = require("../../app/middlewares/multerMiddleware")

router
  .route("/")
  .get(productColorController.getColorForProduct)
  .post(
    middlewareController.authAdminMiddleWare,
    uploadMiddleware().any("pictures", "thumbnail"),
    productColorController.createColor
  )

router
  .route("/:id")
  .get(productColorController.getColorDetail)
  .put(
    middlewareController.authAdminMiddleWare,
    uploadMiddleware().any("pictures", "thumbnail"),
    productColorController.updateColor
  )
  .delete(
    middlewareController.authAdminMiddleWare,
    productColorController.deleteColor
  )

module.exports = router
