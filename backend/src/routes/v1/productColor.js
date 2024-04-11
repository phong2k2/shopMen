const express = require("express");
const router = express.Router();

const productColorController = require("../../app/controllers/v1/ProductColorController");
const middlewareController = require("../../app/middlewares/authMiddleware");

router
  .route("/")
  .get(productColorController.getColorForProduct)
  .post(productColorController.createColor);

router
  .route("/:id")
  .get(productColorController.getColorDetail)
  .put(productColorController.updateColor)
  .delete(productColorController.deleteColor);

module.exports = router;
