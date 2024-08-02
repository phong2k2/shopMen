const express = require("express")
const router = express.Router()

const orderController = require("../../app/controllers/v1/OrderController")
const middlewareController = require("../../app/middlewares/authMiddleware")

router
  .route("/")
  .get(middlewareController.verifyToken, orderController.getAllOrders)
  .post(middlewareController.verifyToken, orderController.createOrder)

router
  .route("/:id")
  .get(middlewareController.verifyToken, orderController.getOrderDetail)
  .put(middlewareController.verifyToken, orderController.updateStatusOrder)
  .post(middlewareController.verifyToken, orderController.cancerOrder)

router.route("/list/statistical").get(orderController.getOrderStatistical)

module.exports = router
