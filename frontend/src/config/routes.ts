const PUBLICROUTER = {
  home: "/",
  auth: "/auth",
  social: "/social",
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
      )}`
  },
  productDetail: {
    index: "/product/:id",
    slug: (slug, id) => `/product/${slug}?id=${id}`
  },
  cart: "/cart",
  order: "/checkout/:id",
  listOrders: {
    index: "/order",
    status: (status, user) => `/order?status=${status}&user=${user}`
  },
  orderStatistics: {
    index: "/orderStatistics"
  },
  account: "/account",
  search: "/search",
  address: "/address",
  forGotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  persistor: "/persistor",
  notFound: "/404"
}

export { PUBLICROUTER }
