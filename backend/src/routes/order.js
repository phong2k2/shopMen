const express = require('express')
const route = express.Router()

const orderController = require('../app/controllers/OrderController')
const middlewareController = require('../app/middlewares/authMiddleware')

route.get('/get-all-order',  orderController.getAllOrders)
route.get('/get-details-order/:id', middlewareController.authUserMiddleware, orderController.getDetailOrder)
route.post('/create', middlewareController.verifyToken, orderController.createOrder)
route.patch('/:id/status', middlewareController.authUserMiddleware, orderController.updateStatusOrder)
route.post('/cancer/:id', middlewareController.authUserMiddleware, orderController.cancerOrder)
route.delete('/delete/:id', middlewareController.authUserMiddleware, orderController.deleteOrder)

module.exports = route