const OrderService = require('../../../services/v1/OrderService')
const {StatusCodes} = require('http-status-codes')
const pick = require('../../../utils/pick');

const OrderController = {
    createOrder: async (req, res, next) => {
        try {
            const response = await OrderService.createOrder(req.body)
            res.status(StatusCodes.CREATED).json(response);
        }catch (error) {
            next(error)
        }
    },
    getAllOrders: async (req, res, next) => {
        try {
            const filter = pick(req.query, [ 'status', 'user']);
            const options = pick(req.query, ['sortBy', 'limit', 'page']);
            const response = await OrderService.getAllOrders(filter, options)
            res.status(StatusCodes.OK).json(response);
        }catch (error) {
            next(error)
        }
    },
    
    getOrderDetail: async (req, res, next) => {
        try {
            const orderId = req.params.id
            
            const response = await OrderService.getOrderDetail(orderId)
            res.status(StatusCodes.OK).json(response);
        }catch (error) {
            next(error)
        }
    },

    getOrderStatistical: async (req, res, next) => {
        try {
            const response = await OrderService.getOrderStatistical(req.query.userId)
            res.status(StatusCodes.OK).json(response);
        }catch (error) {
            next(error)
        }
    },

    getAllOrderStatus: async (req, res, next) => {
        try {
            const {status} = req.params
            
            const response = await OrderService.getAllOrderStatus(status)
            res.status(StatusCodes.OK).json(response);
        }catch (error) {
            next(error)  
        }
    },
    updateStatusOrder: async (req, res, next) => {
        try {
            const id = req.params.id

            const response = await OrderService.updateStatusOrder(id, req.body)
            res.status(StatusCodes.OK).json(response);
        }catch (error) {
            next(error)
        }
    },
    cancerOrder: async (req, res, next) => {

        try {
            const id = req.params.id
            
            const response = await OrderService.cancerOrder(id)
            res.status(StatusCodes.OK).json(response);
        }catch (error) {
            next(error)
        }
    },
    deleteOrder: async (req, res, next) => {
        try {
            const id = req.params.id
            
            const response = await OrderService.deleteOrder(id)
            res.status(StatusCodes.OK).json(response);
        }catch(error) {
            next(error)
        }
    }
}

module.exports = OrderController