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
                    message: 'The orderId is required'
                })
            }
            const response = await OrderService.getDetailOrder(orderId)
            res.status(200).json(response)
        }catch (err) {
            return res.status(500).json(err)
        }
    },
    updateStatusOrder: async (req, res) => {
        try {
            const id = req.params.id
            const newStatus = req.body.status
            if (!id || !newStatus) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The order is required'
                })
            }

            const response = await OrderService.updateStatusOrder(id, newStatus)
            res.status(200).json(response)
        }catch (err) {
            console.log(err)
        }
    },
    cancerOrder: async (req, res) => {

        try {
            const id = req.params.id
            if(!id) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The order id is required'
                }) 
            }
            const response = await OrderService.cancerOrder(id)
            res.status(200).json(response)
        }catch (err) {
            console.log(err)
        }
    },
    deleteOrder: async (req, res) => {
        try {
            console.log(req.params.id)
            const id = req.params.id
            if(!id) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The order id is required'
                }) 
            }
            const response = await OrderService.deleteOrder(id)
            res.status(200).json(response)
        }catch(err) {
            console.log(err)
        }
    }
}

module.exports = OrderController