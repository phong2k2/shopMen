const express = require("express");
const router = express.Router();

const productColorController = require("../../app/controllers/v1/ProductSizeController");
const middlewareController = require("../../app/middlewares/authMiddleware");

router
  .route("/")
  .get(productColorController.getAllSizes)
  .post(
    middlewareController.authAdminMiddleWare,
    productColorController.createSize
  );

router
  .route("/:id")
  .get(productColorController.getSizeDetail)
  .put(
    middlewareController.authAdminMiddleWare,
    productColorController.updateSize
  )
  .delete(
    middlewareController.authAdminMiddleWare,
    productColorController.deleteSize
  );

module.exports = router;
