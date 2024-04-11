const express = require("express");
const router = express.Router();

const productColorController = require("../../app/controllers/v1/ProductSizeController");
const middlewareController = require("../../app/middlewares/authMiddleware");

router
  .route("/")
  .get(productColorController.getAllSizes)
  .post(productColorController.createSize);

router
  .route("/:id")
  .get(productColorController.getSizeDetail)
  .put(productColorController.updateSize)
  .delete(productColorController.deleteSize);

module.exports = router;
