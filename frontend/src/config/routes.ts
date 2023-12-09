const privateRouter = {
    dashboard: '/admin/dashboard',
    indexCategory: '/admin/category/index',
    indexSubCategory: '/admin/cate-item/:id',
    indexProduct: '/admin/product/index',
    createProduct: '/admin/product/create',
    editProduct: '/admin/product/:slug',
    variant: '/admin/variant/:id',
    variantDetails: '/admin/variant-details/:id',
    indexUser: '/admin/user/index',
    order: '/admin/order/:status',
    detailOrder: '/admin/order/detail/:id',
    payment: '/admin/payment/index',
}

const publicRouter = {
    home: '/',
    auth: '/auth',
    product: '/collections/:slug',
    productDetail: '/products/:slug',
    cart: '/cart',
    order: '/checkout/:id',
    listOrders: '/order/:status',
    orderStatistics: '/orderStatistics',
    account: '/account',
    search: '/search',
    address: '/address',
    forGotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    persistor: '/persistor',
    notFound: "*"
}

export {
    privateRouter,
    publicRouter,
}