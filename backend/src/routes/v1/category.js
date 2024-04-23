const express = require("express");
const router = express.Router();

const categoryController = require("../../app/controllers/v1/CategoryController");
const middlewareController = require("../../app/middlewares/authMiddleware");

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(
    middlewareController.authAdminMiddleWare,
    categoryController.createCategory
  );

router
  .route("/:id")
  .get(categoryController.getCategoryDetail)
  .put(
    middlewareController.authAdminMiddleWare,
    categoryController.updateCategory
  )
  .delete(
    middlewareController.authAdminMiddleWare,
    categoryController.deleteCategory
  );

module.exports = router;
