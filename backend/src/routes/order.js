const express = require('express')
const router = express.Router()

const orderController = require('../app/controllers/OrderController')
const middlewareController = require('../app/middlewares/authMiddleware')


router.get('/',  orderController.getAllOrders)
router.get('/:id', middlewareController.authAdminMiddleWare, orderController.getOrderDetail)
router.get('/list/statistical', middlewareController.authAdminMiddleWare, orderController.getOrderStatistical)
router.get('/status/:status', middlewareController.authAdminMiddleWare, orderController.getAllOrderStatus)
router.post('/', middlewareController.verifyToken, orderController.createOrder)
router.patch('/:id/update-status', middlewareController.authAdminMiddleWare, orderController.updateStatusOrder)
router.delete('/:id/cancel', middlewareController.authAdminMiddleWare, orderController.cancerOrder)
router.delete('/:id', middlewareController.authAdminMiddleWare, orderController.deleteOrder)
// router.delete('/:id/cancel', middlewareController.authAdminMiddleWare, orderController.cancelOrder)

module.exports = router