const { StatusCodes } = require("http-status-codes")
const Product = require("../../app/model/Product")
const productTransformer = require("../../transformer/v1/product")
const ApiError = require("../../utils/ApiError")

//GetAll Products
const getAllProducts = async (filter, options) => {
  try {
    const data = await Product.paginate({ ...filter }, options)
    return productTransformer.getProductList(data)
  } catch (error) {
    throw error
  }
}

// Get Product Detail
const getProductDetail = async (filter, options) => {
  try {
    const data = await Product.paginate({ ...filter }, options)
    return productTransformer.getProduct(data)
  } catch (error) {
    throw error
  }
}

// Add Product
const createProduct = async (body) => {
  try {
    const checkProduct = await Product.findOne({ name: body.name })
    if (checkProduct) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Product not found")
    }
    const newProduct = await Product.create({
      ...body
    })

    return {
      data: newProduct
    }
  } catch (error) {
    throw error
  }
}

// Update product
const updateProduct = async (id, body) => {
  try {
    const productOld = await Product.findOne({ _id: id })
    if (!productOld) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Product not found")
    }
    const updateProduct = await Product.findOneAndUpdate({ _id: id }, body, {
      new: true
    })

    return {
      data: updateProduct
    }
  } catch (error) {
    throw error
  }
}

// Delete product
const deleteProduct = async (id) => {
  try {
    const checkDeleteProduct = await Product.findOne({ _id: id })

    if (!checkDeleteProduct) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Product not found")
    }
    await Product.findOneAndDelete({ _id: id })
    return {
      message: "Delete Success"
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllProducts,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct
}
