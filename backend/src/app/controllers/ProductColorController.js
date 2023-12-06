const ProductColorService = require('../../Services/ProductColorService')
const {StatusCodes} = require('http-status-codes');

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
          const {productId} = req.params
          if(!productId) {
              return res.status(404).json({
                  status: 'Error',
                  message: 'The id is required',
              })
          }
          const response = await ProductColorService.getColorForProduct(productId)
          res.status(StatusCodes.OK).json(response);
      }catch (error) {
        next(error)
      }
    },
    
    // Get Detail Color
    getColorDetail: async (req, res, next) => {
      try {
          const {id} = req.params
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