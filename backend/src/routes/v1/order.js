const express = require("express");
const router = express.Router();

const orderController = require("../../app/controllers/v1/OrderController");
const middlewareController = require("../../app/middlewares/authMiddleware");

router
  .route("/")
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);

router
  .route("/:id")
  .get(orderController.getOrderDetail)
  .put(orderController.updateStatusOrder)
  .post(orderController.cancerOrder);

router.route("/list/statistical").get(orderController.getOrderStatistical);

module.exports = router;
