const express = require("express");
const router = express.Router();

const subCategoryController = require("../../app/controllers/v1/SubCategoryController");
const { uploadMiddleware } = require("../../app/middlewares/multerMiddleware");

router
  .route("/")
  .get(subCategoryController.getSubCategory)
  .post(uploadMiddleware, subCategoryController.createSubCategory);

router
  .route("/:id")
  .get(subCategoryController.getSubCategoryDetail)
  .put(uploadMiddleware, subCategoryController.updateSubCategory)
  .delete(subCategoryController.deleteSubCategory);

module.exports = router;
