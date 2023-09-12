const Order = require('../app/model/Order')
const Product = require('../app/model/Product')

const createOrder = (newOrder) => {

    return new Promise( async (resolve, reject) => {
        const { orderItems, shippingPrice, totalPrice, fullName, address, email, city, phone,user } = newOrder
        try {
            // , fullName, address, city, phone,email
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
                }
                 else {
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
                resolve({
                    status: 'ERR',
                    message: `San pham voi id: ${arrId.join(',')} khong du hang`
                })
            } else {
                // Mã sản phẩm
                const currentDateTime = new Date();
                const orderCode = currentDateTime.toISOString().replace(/[^0-9]/g, '');

                const createdOrder = await Order.create({
                    orderItems,
                    shippingAddress: {
                        fullName,
                        address,
                        email,
                        city,
                        phone,
                    },
                    shippingPrice,
                    totalPrice,
                    user: user,
                    orderCode
                })
                resolve({
                    status: 'success',
                    message: 'Product created successfully',
                    data: createdOrder
                })
            }
        }catch (err) {
            reject(err)
        }
    })
}


const getAllOrders = () => {
    return new Promise( async (resolve, reject) => {
        try {
            const allOrders = await Order.find().sort({createdAt: -1, updatedAt: -1})
            resolve({
                status: 'OK',
                message: 'Success',
                data: allOrders
            })
        }catch (err) {
            reject(err)
        }
    })
}

const getDetailOrder = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id
            }).populate('user', ['username', 'image'])
            if(order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        }catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    createOrder,
    getAllOrders,
    getDetailOrder
}  