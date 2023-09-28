const privateRouter = {
    dashboard: '/admin/dashboard',
    indexCategory: '/admin/category/index',
    createCategory: '/admin/category/create',
    editCategory: '/admin/category/:id',
    indexSubCategory: '/admin/cate-item/:id',
    editSubCategory: '/admin/cate-item/edit/:id',
    indexProduct: '/admin/product/index',
    createProduct: '/admin/product/create',
    editProduct: '/admin/product/:id',
    indexUser: '/admin/user/index',
    editUser: '/admin/user/:id',
    order: '/admin/order/index',
    detailOrder: '/admin/order/detail/:id',
    variant: '/admin/variant/:id',
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
    search: '/search',
    // persistor: '/persistor'
}

export {
    privateRouter,
    publicRouter,
}