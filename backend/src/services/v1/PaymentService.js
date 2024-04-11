const {StatusCodes} = require('http-status-codes');
const Payment = require("../../app/model/Payment")
const ApiError = require('../../utils/ApiError')
const { env } = require('../../configs/environment')

const createPayment = async (body) => {
        try {
            const checkPayment = await Payment.findOne({name: body.name})
            if(checkPayment) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Payment not found')
            }

            const newPayment = await Payment.create(body)
            
            return {
                data: newPayment
            }
        }catch (error) {
            throw error
        }
}

const getAllPayment = async () => {
        try {
            const getAllPayment = await Payment.find({})
            
            return {
                data: getAllPayment
            }
        } catch (error) {
            throw error
        }
}

const getPaymentDetail = async (id) => {
        try {
            const PaymentDetail = await Payment.findOne({
                _id: id,
            })
            
            return {
                data: PaymentDetail
            }
        }catch (error) {
            throw error
        }
}

const getConfigPaypal = async () => {
        try {
            const clientId = env.CLIENT_ID
           
            return {
                data: clientId
            }
        }catch(error) {
            throw error
        }
}

const updatePayment = async (id, body) => {
    try {
        const checkPayment = await Payment.findOne({_id: id})
        if(!checkPayment) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Payment not found')
        } 
        const updatePayment = await Payment.findOneAndUpdate({_id: id}, body, {new: true})

        return {
            data: updatePayment
        }
    }catch (error) {
        throw error
    }

}

const updateStatusPayment = async (id, status) => {
    try {
        const checkPayment = await Payment.findOne({_id: id})
        if(!checkPayment) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Payment not found')
        } 

        const updatePayment = await Payment.findOneAndUpdate(
            { _id: id }, 
            { $set: { status: status } }, 
            { new: true } 
        )

        return {
            data: updatePayment
        }
    }catch(error) {
        throw error
    }

}


const deletePayment = async (id) => {
        try {
            const checkPayment = await Payment.findOne({_id: id});
            if (!checkPayment) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Payment not found')
            }

            await Payment.findOneAndDelete({_id: id})
            
            return {
                message: 'Delete Success',
            }
        }catch(error)  {
            throw error
        }
}

module.exports = {
    createPayment,
    getAllPayment,
    getPaymentDetail,
    getConfigPaypal,
    updatePayment,
    updateStatusPayment,
    deletePayment
}