const express = require("express")
const router = express.Router()

const subCategoryController = require("../../app/controllers/v1/SubCategoryController")
const { uploadMiddleware } = require("../../app/middlewares/multerMiddleware")
const middlewareController = require("../../app/middlewares/authMiddleware")

router
  .route("/")
  .get(subCategoryController.getAllSubCategory)
  .post(
    middlewareController.authAdminMiddleWare,
    uploadMiddleware().single("image"),
    subCategoryController.createSubCategory
  )

router
  .route("/:id")
  .get(subCategoryController.getSubCategoryDetail)
  .put(
    middlewareController.authAdminMiddleWare,
    uploadMiddleware().single("image"),
    subCategoryController.updateSubCategory
  )
  .delete(
    middlewareController.authAdminMiddleWare,
    subCategoryController.deleteSubCategory
  )

module.exports = router
