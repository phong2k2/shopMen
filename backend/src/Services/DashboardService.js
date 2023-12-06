const Product = require('../app/model/Product');
const Order = require('../app/model/Order');
const User = require('../app/model/User');


const homeAdmin = () => {
    return new Promise(async (resolve, reject) =>{
        try {
            const totalProducts = await Product.count({})
            const totalOrders = await Order.count({})
            const totalUsers = await User.count({})
            const [{ totalPrice}] = await Order.aggregate([
                {
                    $group: {
                        _id: null,
                        totalPrice: { $sum: "$totalPrice" },
                    },
                },
            ]);
            if (!totalProducts || !totalOrders || !totalUsers || !totalPrice) {
                return reject({
                    status: 'error',
                })
            }
            resolve({
                status: 'Success',
                message: 'Search successfully',
                totalProducts,
                totalOrders,
                totalUsers,
                totalPriceOrder: totalPrice
            })
        }catch(error) {
            reject(error)
        }
    })
}

function getMonthYear(date) {
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    return `${month}-${year}`;
}



const calculateRevenue = (orders) => {
    return orders.reduce((revenue, order) => {
        const monthYear = getMonthYear(new Date(order.createdAt));
        const year = new Date(order.createdAt).getFullYear();
        
        revenue.annual[year] = (revenue.annual[year] || 0) + order.totalPrice;
        revenue.monthly[monthYear] = (revenue.monthly[monthYear] || 0) + order.totalPrice;

        return revenue;
    }, { monthly: {}, annual: {} });
}



const dataChart = () => {
    return new Promise( async (resolve, reject) => {
        try {
            const orders = await Order.find({})

            const revenueData = calculateRevenue(orders);

            resolve({
                status: 'success',
                data: revenueData
            })
        }catch(error) {
            reject(error)
        }
    })
}

module.exports = {
    homeAdmin,
    dataChart
}