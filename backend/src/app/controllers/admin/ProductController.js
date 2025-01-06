const { StatusCodes } = require("http-status-codes")
const ProductService = require("../../../services/admin/ProductService")
const pick = require("../../../utils/pick")
const ProductController = {
  getProductDetail: async (req, res, next) => {
    try {
      const {
        params: { productId },
        query
      } = req

      const options = pick(query, ["sortBy", "limit", "page"])
      options.populate = [
        { path: "category" },
        { path: "subCategory" },
        { path: "color" },
        { path: "size" }
      ]

      const response = await ProductService.getProductDetail(
        { _id: productId },
        options
      )
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },

  // Add Product
  createProduct: async (req, res, next) => {
    try {
      const response = await ProductService.createProduct(req.body)
      res.status(StatusCodes.CREATED).json(response)
    } catch (error) {
      next(error)
    }
  },

  // Upadte product
  updateProduct: async (req, res, next) => {
    try {
      const fileData = req.file
      const proSlug = req.params.slug

      const response = await ProductService.updateProduct(
        proSlug,
        req.body,
        fileData
      )
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },

  //Delete Product
  deleteProduct: async (req, res, next) => {
    try {
      const { publicId } = req.query

      const response = await ProductService.deleteProduct(
        req.params.id,
        publicId
      )
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController
