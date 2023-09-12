const OrderService = require('../../Services/OrderService')

const OrderController = {
    createOrder: async (req, res) => {
        try {
            const response = await OrderService.createOrder(req.body)
            res.status(200).json(response)
        }catch (err) {
            return res.status(500).json(err)
        }
    },
    getAllOrders: async (req, res) => {
        try {
            const response = await OrderService.getAllOrders()
            res.status(200).json(response)
        }catch (err) {
            return res.status(500).json(err)
        }
    },
    getDetailOrder: async (req, res) => {
        try {
            const orderId = req.params.id
            if (!orderId) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The userId is required'
                })
            }
            const response = await OrderService.getDetailOrder(orderId)
            res.status(200).json(response)
        }catch (err) {
            return res.status(500).json(err)
        }
    }
}

module.exports = OrderController