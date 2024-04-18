const ProductColorService = require('../../../services/v1/ProductColorService')
const {StatusCodes} = require('http-status-codes');
const pick = require('../../../utils/pick');

const ProductColors = {
    // Create color
    createColor: async (req, res, next) => {
      try {
          const response = await ProductColorService.createColor(req.body)
          res.status(StatusCodes.CREATED).json(response);
      }catch(error) {
        next(error)
      }
    },
    
    //Get  color
    getColorForProduct: async (req, res, next) => {
      try {
        const filter = pick(req.query, [ 'product']);
        const options = pick(req.query, ['sortBy', 'limit', 'page']);
        options.populate = [
          { path: 'gallery' },
          { path: 'size' },
        ]

        const response = await ProductColorService.getColorForProduct(filter, options)
        res.status(StatusCodes.OK).json(response);
      }catch (error) {
        next(error)
      }
    },
    
    // Get Detail Color
    getColorDetail: async (req, res, next) => {
      try {
          const { id } = req.params
          const response = await ProductColorService.getColorDetail(id)
          res.status(StatusCodes.OK).json(response);
      }catch (error) {
          next(error)
      }
    },
    // Update
    updateColor: async (req, res, next) => {
        try {
          const id = req.params.id
          const newColor = req.body
          const response = await ProductColorService.updateColor(id,newColor)
          res.status(StatusCodes.OK).json(response);
        }catch (error) {
            next(error)
        }
    },
    //Delete Color
    deleteColor: async (req, res, next) => {
      try {
          const id = req.params.id
          
          const response = await ProductColorService.deleteColor(id)
          res.status(StatusCodes.OK).json(response);
      }catch (error) {
          next(error)
      }
    },
}

module.exports = ProductColors