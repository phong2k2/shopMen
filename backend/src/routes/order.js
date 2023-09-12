const express = require('express')
const route = express.Router()

const orderController = require('../app/controllers/OrderController')
const middlewareController = require('../app/middlewares/authMiddleware')

route.get('/get-all-order',  orderController.getAllOrders)
route.get('/get-details-order/:id', middlewareController.authUserMiddleware, orderController.getDetailOrder)
route.post('/create', middlewareController.authUserMiddleware, orderController.createOrder)

module.exports = route