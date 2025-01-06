const express = require("express")
const router = express.Router()

const paymentController = require("../../app/controllers/v1/PaymentController")
const middlewareController = require("../../app/middlewares/authMiddleware")
router.route("/vnpay-payment").post(paymentController.vnpayPayment)
router.route("/vnpay-return").get(paymentController.vnpayPaymentReturn)
router.route("/vnpay-ipn").get(paymentController.vnpayPaymentIPN)

router
  .route("/")
  .get(paymentController.getAllPayment)
  .post(
    middlewareController.authAdminMiddleWare,
    paymentController.createPayment
  )

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
  )

router.route("/configId").get(paymentController.getConfigPaypal)
router.route("/:id/status").patch(paymentController.updateStatusPayment)

module.exports = router
