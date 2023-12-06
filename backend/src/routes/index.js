const dashboardRoute = require('./dashboard')
const categoryRoute = require('./category')
const subCategoryRoute = require('./subCategory')
const productRoute = require('./product')
const orderRoute = require('./order')
const authRoute = require('./auth')
const userRoute = require('./user')
const productColorRouter = require('./productColor')
const productGalleryRouter = require('./gallery')
const productSizeRouter = require('./productSize')
const paymentRoute = require('./payment')
const addressRoute = require('./address')

function router(app) {
    app.use('/api/dashboard', dashboardRoute)
    app.use('/api/categories', categoryRoute)
    app.use('/api/subcategories', subCategoryRoute)
    app.use('/api/products', productRoute)
    // Upload Images

    app.use('/api/colors', productColorRouter)
    
    app.use('/api/galleries', productGalleryRouter)

    app.use('/api/sizes', productSizeRouter)

    app.use('/api/payments', paymentRoute)

    app.use('/api/auth', authRoute)

    app.use('/api/users', userRoute)

    app.use('/api/address/', addressRoute)

    app.use('/api/orders', orderRoute)
}

module.exports = router;