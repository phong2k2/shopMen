const ProductSizeService = require('../../../services/v1/ProductSizeService')
const {StatusCodes} = require('http-status-codes');
const pick = require('../../../utils/pick');

const ProductSizes = {
    // Create color
    createSize: async (req, res, next) => {
      try {
          const valueSize = req.body
          const response = await ProductSizeService.createSize(valueSize)
          res.status(StatusCodes.CREATED).json(response);
      }catch(error) {
          next(error)
      }
    },
    
    getAllSizes: async (req, res, next) => {
        try {
            const filter = pick(req.query, [ 'productColor']);
            const options = pick(req.query, ['sortBy', 'limit', 'page']);
            
            const response = await ProductSizeService.getAllSizes(filter, options)
            res.status(StatusCodes.OK).json(response);
        }catch(error) {
            next(error)
        }
    },

    getSizeDetail: async (req, res, next) => {
        try {
            const {id} = req.params
           
            const response = await ProductSizeService.getSizeDetail(id)
            res.status(StatusCodes.OK).json(response);
        }catch (error) {
            next(error)
        }
      },

      // Update
    updateSize: async (req, res, next) => {
        try {
            const id = req.params.id
            const newSize = req.body

          const response = await ProductSizeService.updateSize(id,newSize)
          res.status(StatusCodes.OK).json(response);
        }catch (error) {
            next(error)
        }
    },

    deleteSize: async (req, res, next) => {
        try {
            const id = req.params.id
            
            const response = await ProductSizeService.deleteSize(id)
            res.status(StatusCodes.OK).json(response);
        }catch (error) {
            next(error)
        }
    }
}

module.exports = ProductSizes