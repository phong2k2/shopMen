const ProductColorService = require("../../../services/v1/ProductColorService")
const { StatusCodes } = require("http-status-codes")
const pick = require("../../../utils/pick")

const ProductColors = {
  // Create color
  createColor: async (req, res, next) => {
    try {
      const images = []
      req.files.forEach((file) => {
        if (file.fieldname == "thumbnail") {
          req.body[file.fieldname] = file.filename
          return
        }
        images.push(file.filename)
      })
      const response = await ProductColorService.createColor(req.body, images)
      res.status(StatusCodes.CREATED).json(response)
    } catch (error) {
      next(error)
    }
  },

  //Get  color
  getColorForProduct: async (req, res, next) => {
    try {
      const filter = pick(req.query, ["product"])
      const options = pick(req.query, ["sortBy", "limit", "page"])
      options.populate = [{ path: "size" }]

      const response = await ProductColorService.getColorForProduct(
        filter,
        options
      )
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },

  // Get Detail Color
  getColorDetail: async (req, res, next) => {
    try {
      const { id } = req.params
      const response = await ProductColorService.getColorDetail(id)
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },
  // Update
  updateColor: async (req, res, next) => {
    try {
      const id = req.params.id
      req.files.forEach((file) => {
        if (file.fieldname == "thumbnail") {
          req.body[file.fieldname] = file.filename
          return
        }
        images.push(file.filename)
      })
      const response = await ProductColorService.updateColor(id, req.body)
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },
  //Delete Color
  deleteColor: async (req, res, next) => {
    try {
      const id = req.params.id

      const response = await ProductColorService.deleteColor(id)
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductColors
