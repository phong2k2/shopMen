const express = require("express");
const router = express.Router();

const paymentController = require("../../app/controllers/v1/PaymentController");
const middlewareController = require("../../app/middlewares/authMiddleware");

router
  .route("/")
  .get(paymentController.getAllPayment)
  .post(
    middlewareController.authAdminMiddleWare,
    paymentController.createPayment
  );

router
  .route("/:id")
  .get(paymentController.getPaymentDetail)
  .put(
    middlewareController.authAdminMiddleWare,
    paymentController.updatePayment
  )
  .delete(
    middlewareController.authAdminMiddleWare,
    paymentController.deletePayment
  );

router.route("/configId").get(paymentController.getConfigPaypal);

router.route("/:id/status").patch(paymentController.updateStatusPayment);

module.exports = router;
