const express = require("express");
const router = express.Router();

const paymentController = require("../../app/controllers/v1/PaymentController");
const middlewareController = require("../../app/middlewares/authMiddleware");

router
  .route("/")
  .get(paymentController.getAllPayment)
  .post(paymentController.createPayment);

router
  .route("/:id")
  .get(paymentController.getPaymentDetail)
  .put(paymentController.updatePayment)
  .delete(paymentController.deletePayment);

router.route("/configId").get(paymentController.getConfigPaypal);

router.route("/:id/status").patch(paymentController.updateStatusPayment);

module.exports = router;
