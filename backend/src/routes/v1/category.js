const express = require("express");
const router = express.Router();

const categoryController = require("../../app/controllers/v1/CategoryController");

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);

router
  .route("/:id")
  .get(categoryController.getCategoryDetail)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
