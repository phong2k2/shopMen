const categoryRoute = require('./category')
const subCategoryRoute = require('./subCategory')
const productRoute = require('./product')
const orderRoute = require('./order')
const authRoute = require('./auth')
const userRoute = require('./user')

function route(app) {
    app.use('/api/category', categoryRoute)
    app.use('/api/subcategory', subCategoryRoute)
    app.use('/api/product', productRoute)

    app.use('/api/auth', authRoute)

    app.use('/api/user', userRoute)

    app.use('/api/order', orderRoute)
}

module.exports = route;