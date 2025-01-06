const CategoryService = require("../../../services/v1/CategoryService")
const { StatusCodes } = require("http-status-codes")

const CategoryController = {
  // ADD Category
  createCategory: async (req, res, next) => {
    try {
      const response = await CategoryService.createCategory(req.body)
      res.status(StatusCodes.CREATED).json(response)
    } catch (error) {
      next(error)
    }
  },
  // GET ALL Categoies
  getAllCategories: async (req, res, next) => {
    try {
      const response = await CategoryService.getAllCategories()
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },

  //Get an category by slug
  getDetailCategory: async (req, res, next) => {
    try {
      const { slug } = req.params
      const response = await CategoryService.getDetailCategory(slug)
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },

  // Get A Category
  getCategoryDetail: async (req, res, next) => {
    try {
      const { id } = req.params
      const response = await CategoryService.getCategoryDetail(id)
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },

  // Update Category
  updateCategory: async (req, res, next) => {
    try {
      const { id } = req.params
      const response = await CategoryService.updateCategory(id, req.body)
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },
  // Delete Category
  deleteCategory: async (req, res, next) => {
    try {
      const { id } = req.params
      const response = await CategoryService.deleteCategory(id)
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CategoryController
