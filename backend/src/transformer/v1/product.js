const getProductList = (data) => {
  const { results, ...meta } = data
  const products = results.map((i) => {
    const {
      price,
      countInStock,
      salePrice,
      hot,
      color,
      size,
      thumbnail,
      description,
      slug,
      _id,
      name,
      category,
      subCategory,
      createdAt,
      updatedAt
    } = i._doc
    return {
      price,
      salePrice,
      description,
      _id,
      name,
      countInStock,
      hot,
      slug,
      color,
      thumbnail,
      size,
      category: {
        name: category?.name || null,
        _id: category?._id || null
      },
      subcategory: {
        name: subCategory?.name || null,
        _id: subCategory?._id || null
      },
      createdAt,
      updatedAt
    }
  })

  return {
    data: products,
    meta
  }
}

const getProduct = (data) => {
  const { results, ...meta } = data
  const {
    price,
    countInStock,
    salePrice,
    hot,
    color,
    thumbnail,
    size,
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
    color,
    thumbnail,
    size,
    category,
    subCategory,
    createdAt,
    updatedAt
  }

  return {
    data: products,
    ...meta
  }
}

module.exports = {
  getProduct,
  getProductList
}
