
const {StatusCodes} = require('http-status-codes');
const Order = require('../../app/model/Order')
const Product = require('../../app/model/Product')
const ApiError = require('../../utils/ApiError')

const createOrder = async (newOrder) => {
        const {
            orderItems, shippingPrice ,payment, totalPrice, fullName,
            address, email, phone, district, province, ward, user 
        } = newOrder
        try {
            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        countInStock: {$gte: order.amount}
                    },
                    {$inc: {
                        countInStock: -order.amount,
                        sold: +order.amount
                    }},
                    {new: true}
                )
                if(productData) {
                    return {
                        status: 'OK',
                        message: 'SUCCESS'
                    }
                }else {
                    return{
                        status: 'OK',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(promises)
            // Kiểm tra những sản phẩm không đủ số lượng hàng
            const newData = results && results.filter((item) => item.id)
            if(newData.length) {
                const arrId = []
                newData.forEach((item) => {
                    arrId.push(item.id)
                })
                throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, `San pham voi id: ${arrId.join(',')} khong du hang`)
            } else {
                // Mã đơn hàng
                const orderCode = "ORD-" + Date.now();

                const dataOrder = await Order.create({
                    orderItems,
                    shippingAddress: {
                        fullName,
                        address,
                        email,
                        district,
                        province,
                        ward,
                        phone,
                    },
                    shippingPrice,
                    payment,
                    totalPrice,
                    user: user,
                    orderCode,
                })
                
                return {
                    data: dataOrder
                }
            }
        }catch (error) {
            throw error
        }
}


const getAllOrders = async (filter, options) => {
        try {
            const allOrders = await Order.paginate({ ...filter }, options);

            return {
                data: allOrders
            }
        }catch (error) {
            throw error
        }
}

const getOrderDetail = async (id) => {
        try {
            const order = await Order.findById({
                _id: id
            }).populate('user', ['username', 'image'])
            if(!order) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Order not found')
            }
           
            return {
                data: order
            }
        }catch (error) {
            throw error
        }
}

const getAllOrderStatus = async (status) => {
        try {
            const allOrdersStatus = await Order.find({
                status
            })
            if(!allOrdersStatus) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Order not found')
            }
            
            return {
                data: allOrdersStatus
            }
        }catch(error) {
            throw error
        }
}

const getOrderStatistical = async (userId) => {

    try {   
        const totalProcessing = await Order.count({
            status: 'processing',
            user: userId
        })
        const totalConfirmed = await Order.count({
            status: 'confirmed',
            user: userId
        })
        const totalComplete = await Order.count({
            status: 'complete',
            user: userId
        })
        const totalCancelled = await Order.count({
            status: 'cancelled',
            user: userId
        })
        
        return {
            data: {totalProcessing, totalConfirmed, totalComplete, totalCancelled}
        }
    }catch(error) {
        throw error
    }
}

const updateStatusOrder = async (id, dataUpdate) => {
        try {
            const checkOrder = await Order.find({_id: id});
            if(!checkOrder) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Order not found')
            }
            const dataUpdate = await Order.findOneAndUpdate(
                { _id: id }, 
                { $set: dataUpdate}, 
                { new: true } 
            );

            
            return {
                data: dataUpdate
            }
        }catch (error) {
            throw error
        }
}

const cancerOrder = async (id) => {
        try {
            const order = await Order.findById(id);
            if(!order) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Order not found')
            }

            if(order.status === 'shipped' || order.status === 'complete'){
                throw new ApiError(StatusCodes.FORBIDDEN, 'Orders that have been shipped or completed cannot be canceled')
            }

            order.status = 'cancelled';
            await order.save();

            return {
                message: 'The order has been successfully canceled',
            }
        }catch (error) {
            throw error
        }
}


const deleteOrder = async (id) => {
        try {
            const checkOrder = await Order.findOne({_id: id});
            if (!checkOrder) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Order not found')
            }
            await Order.deleteOne({_id: id})

            return {
                message: 'Delete Success',
            }
        }catch (error) {
            throw error
        }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderDetail,
    getAllOrderStatus,
    getOrderStatistical,
    updateStatusOrder,
    cancerOrder,
    deleteOrder
}  