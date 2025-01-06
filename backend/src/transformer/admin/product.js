const getProduct = (data) => {
  const { results, ...meta } = data
  const {
    price,
    countInStock,
    salePrice,
    hot,
    thumbnail,
    description,
    slug,
    _id,
    name,
    category,
    subCategory,
    createdAt,
    updatedAt
  } = results[0]

  const products = {
    price,
    salePrice,
    description,
    _id,
    name,
    countInStock,
    hot,
    slug,
    thumbnail,
    category: category?._id || null,
    subCategory: subCategory?._id || null,
    createdAt,
    updatedAt
  }

  return {
    data: products,
    ...meta
  }
}

module.exports = {
  getProduct
}
