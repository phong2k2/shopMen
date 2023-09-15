const privateRouter = {
    dashboard: '/admin/dashboard',
    indexCategory: '/admin/category/index',
    createCategory: '/admin/category/create',
    editCategory: '/admin/category/:id',
    indexProduct: '/admin/product/index',
    createProduct: '/admin/product/create',
    editProduct: '/admin/product/:id',
    indexUser: '/admin/user/index',
    order: '/admin/order/index',
    detailOrder: '/admin/order/detail/:id'
}

const publicRouter = {
    home: '/',
    auth: '/auth',
    category: '/:slug',
    productDetail: '/products/:slug',
    cart: '/cart',
    order: '/checkout/:id',
    listOrders: '/order',
    profile: '/profile',
}

export {
    privateRouter,
    publicRouter,
}