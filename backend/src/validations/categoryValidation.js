const Joi = require('joi');
const {StatusCodes} = require('http-status-codes');
const ApiError = require('../utils/ApiError')


const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        name: Joi.string().required().trim().strict()
    })

    try {
        // set abortEarly : false để trường hợp có nhiều lỗi validations thì trả về tất cả lỗi
        await correctCondition.validateAsync(req.body, {abortEarly: false})
        next()
    }catch(error) {
        const errorMessage = new Error(error).message
        const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
        next(customError)
    }
}

const updateNew = async (req, res, next) => {
    // Đối với update không sử dụng .required()
    const correctCondition = Joi.object({
        name: Joi.string().trim().strict()
    })

    try {
        // Set abortEarly : false để trường hợp có nhiều lỗi validations thì trả về tất cả lỗi
        // Đối với trường hợp update cho phép sử dụng allowUnknown để không cần đầy một số filed lên
        await correctCondition.validateAsync(req.body, {
            abortEarly: false,
            allowUnknown: true
        })
        next()
    }catch(error) {
        const errorMessage = new Error(error).message
        const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
        next(customError)
    }
}

const categoryValidation = {
    createNew
}

module.exports = {
    categoryValidation
}