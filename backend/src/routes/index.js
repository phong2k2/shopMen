const categoryRoute = require('./category')
const subcategoryRoute = require('./subcategory')
const productRoute = require('./product')
const orderRoute = require('./order')
const authRoute = require('./auth')
const userRoute = require('./user')

function route(app) {
    app.use('/api/admin/category', categoryRoute)
    app.use('/api/admin/subcategory', subcategoryRoute)
    app.use('/api/admin/product', productRoute)

    app.use('/api/auth', authRoute)

    app.use('/api/user', userRoute)

    app.use('/api/order', orderRoute)
}

module.exports = route;