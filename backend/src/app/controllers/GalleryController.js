const GalleryService = require('../../Services/GalleryService')
const {StatusCodes} = require('http-status-codes');

const GalleryController = {
    
    getAllGalleriesForProduct: async (req, res, next) => {
        try {
            const {productId} = req.params
            if (!productId) {
                return res.status(404).json({
                    status: 'Error',
                    message: 'The id is required',
                })
            }
            const response = await GalleryService.getAllGalleriesForProduct(productId)
            res.status(StatusCodes.OK).json(response);
        }catch (error) {
            next(error)
        }
    },

    getGalleryDetail: async (req, res, next) => {
        try {
            const {id} = req.params
            if (!id) {
                return res.status(404).json({
                    status: 'Error',
                    message: 'The id is required',
                })
            }
            const response = await GalleryService.getGalleryDetail(id)
            res.status(StatusCodes.OK).json(response);
        }catch (error) {
            next(error)
        }
    },

    createGallery: async (req, res, next) => {
        try {
            const fileData = req.file
            const response = await GalleryService.createGallery(req.body, fileData)
            res.status(StatusCodes.CREATED).json(response);
        }catch (error) {
            next(error)
        }
    },

    updateGallery: async (req, res, next) => {
        try {
            const fileData = req.file
            const {id} = req.params
            if(!id) {
                return res.status(404).json({
                    status: 404,
                    message: 'Id product not found'
                })
            }

            const response = await GalleryService.updateGallery(id, req.body, fileData)
            res.status(StatusCodes.OK).json(response);
        }catch (error) {
            next(error)
        }
    },

    deleteGallery: async (req, res, next) => {
        try {
            const {publicId} = req.query
            const {id} = req.params

            if(!id || !publicId) {
                return res.status(404).json({
                    status: 'Error',
                    message: 'The id is required',
                })
            }
            const response = await GalleryService.deleteGallery(id, publicId)
            res.status(StatusCodes.OK).json(response);
        }catch (error) {
            next(error)
        }
    }

}


module.exports = GalleryController