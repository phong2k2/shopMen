const PRIVATEROUTER = {
  dashboard: "/admin/dashboard",
  indexCategory: "/admin/category/index",
  indexSubCategory: "/admin/cate-item/:id",
  indexProduct: "/admin/product/index",
  createProduct: "/admin/product/create",
  editProduct: "/admin/product/:id",
  variant: "/admin/variant/:id",
  variantDetails: "/admin/variant-details/:id",
  indexUser: "/admin/user/index",
  order: "/admin/order",
  listOrderStatus: {
    index: "/admin/list-order",
    status: (status, userId) =>
      `/admin/list-order/?userId=${userId}&status=${status}`,
  },
  detailOrder: "/admin/order/detail/:id",
  payment: "/admin/payment/index",
};

const PUBLICROUTER = {
  home: "/",
  auth: "/auth",
  product: {
    index: "/collections",
    slug: (slug, id) => `/collections/${slug}?id=${id}`,
    category: (categoryId, categoryName) =>
      `/collections?categoryId=${categoryId}&categoryName=${encodeURIComponent(
        categoryName
      )}`,
    subCategory: (categoryId, categoryName) =>
      `/collections?subCategoryId=${categoryId}&categoryName=${encodeURIComponent(
        categoryName
      )}`,
  },
  productDetail: {
    index: "/product/:id",
    slug: (slug, id) => `/product/${slug}?id=${id}`,
  },
  cart: "/cart",
  order: "/checkout/:id",
  listOrders: {
    index: "/order",
    status: (status, user) => `/order?status=${status}&user=${user}`,
  },
  orderStatistics: {
    index: "/orderStatistics",
  },
  account: "/account",
  search: "/search",
  address: "/address",
  forGotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  persistor: "/persistor",
  notFound: "*",
};

export { PRIVATEROUTER, PUBLICROUTER };
