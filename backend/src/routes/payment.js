const express = require('express');
const router = express.Router();

const paymentController = require('../app/controllers/PaymentController');
const middlewareController = require('../app/middlewares/authMiddleware')

router.get('/', paymentController.getAllPayment)
router.get('/configId', paymentController.getConfigPaypal)
router.get('/:id', paymentController.getPaymentDetail)
router.post('/', middlewareController.authAdminMiddleWare, paymentController.createPayment)
router.put('/:id', middlewareController.authAdminMiddleWare, paymentController.updatePayment)
router.patch('/:id/status', middlewareController.authAdminMiddleWare, paymentController.updateStatusPayment)
router.delete('/:id', middlewareController.authAdminMiddleWare, paymentController.deletePayment)


module.exports = router