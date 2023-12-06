const PaymentService = require('../../Services/PaymentService')
const {StatusCodes} = require('http-status-codes');

const PaymentController = {
    //ADD
    createPayment: async (req, res, next) => {
        try {
            const response = await PaymentService.createPayment(req.body)
            res.status(StatusCodes.CREATED).json(response);
        }catch(error) {
            next(error)
        }
    },
    //Get All
    getAllPayment: async (req, res, next) => {
        try {
            const response = await PaymentService.getAllPayment()
            res.status(StatusCodes.OK).json(response);
        }catch (error) {
            next(error)
        }
    },
    //Get Detail
    getPaymentDetail: async (req, res, next) => {
        try {
            const id = req.params.id
            
            const response = await PaymentService.getPaymentDetail(id)
            res.status(StatusCodes.OK).json(response);
        }catch(error) {
            next(error)
        }
    },
    // Get config Paypal
    getConfigPaypal: async (req, res, next) => {
        try {
            const response = await PaymentService.getConfigPaypal()
            res.status(StatusCodes.OK).json(response);
        }catch(error) {
            next(error)
        }
    },
    //Update Payment
    updatePayment: async (req, res, next) => {
        try {
            const id = req.params.id
            
            const response = await PaymentService.updatePayment(id, req.body)
            res.status(StatusCodes.OK).json(response);
        }catch(error) {
            next(error)
        }
    },
    //Update status payment
    updateStatusPayment: async (req, res, next) => {
        try {
            const {id} = req.params
            const {status} = req.body
            
            const response = await PaymentService.updateStatusPayment(id, status)
            res.status(StatusCodes.OK).json(response);
        }catch (error) {
            next(error)
        }
    },
    //Delete a Payment
    deletePayment: async (req, res, next) => {
        try {
            const id = req.params.id
            
            const response = await PaymentService.deletePayment(id)
            res.status(StatusCodes.OK).json(response);
        }catch(error) {
            next(error)
        }
    }
}

module.exports = PaymentController