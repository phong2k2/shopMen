const {StatusCodes} = require('http-status-codes');
const ProductService = require('../../Services/ProductService')
const ApiError = require('../../utils/ApiError')
const ProductController = {
    
    //Search Product
    searchProduct: async (req, res, next) => {
        try {
            const {q, page, type} = req.query
            const limitProps  = {
                'less': 5,
                'more': 10
            }
            const limit = limitProps[type] || limitProps.less; 

            const response = await ProductService.searchProduct(q, page, limit)
             res.status(StatusCodes.OK).json(response);
        }catch (error) {
            next(error)
        }
    },

    // Add Product
    createProduct: async (req, res, next) => {
        try {
            // const fileData = req.file
            const response = await ProductService.createProduct(req.body)
            res.status(StatusCodes.CREATED).json(response);
        }catch(error) {
            next(error)
        }
    },

    // Upadte product 
    updateProduct: async (req, res, next) => {
        try {
            const fileData = req.file
            const proSlug = req.params.slug

            const response = await ProductService.updateProduct(proSlug, req.body, fileData)
            res.status(StatusCodes.OK).json(response);
        }catch (error) {
             next(error)
        }
    },
    
    //GetAll Products
    getAllProducts: async (req, res, next) => {
        try {
            const response = await ProductService.getAllProducts(req.query)
            res.status(StatusCodes.OK).json(response);
        }catch(error) {
             next(error)
        }
    },

    getAllProductsForHome: async (req, res, next) => {
        try {
            const response = await ProductService.getAllProductsForHome(req.query)
            res.status(StatusCodes.OK).json(response);
        }catch(error) {
             next(error)
        }
    },
    
    // Get Details Product
    getProductBySlug: async (req, res, next) => {
        try {
            const {slug} = req.params
            const response = await ProductService.getProductBySlug(slug)
             res.status(StatusCodes.OK).json(response);
        }catch(error) {
             next(error)
        }
    },

    // Get Product By Category
    getProductByCategory: async (req, res, next) => {
        try {
            const {slug} = req.params
            let filterPrice = ''
            const { 
                limit=10,
                page,
                sort="default",
                price_min,
                price_max
            } = req.query
            
            if(!sort) throw new ApiError(StatusCodes.NOT_FOUND, 'Error')
            
            let sortBy = {}
            let sortCut = sort.split('-')
            if(sortCut[1]) {
                sortBy[sortCut[0]] = sortCut[1]
            }else {
                sortBy = null
            }

            const options = {
                page,
                limit,
                sort: sortBy,
                populate: ['category', 'subCategory'],
                populate:[{
                    path: 'color', // Điều hướng đến trường 'color'
                    populate: [
                        { path: 'gallery' }, // Điều hướng đến trường 'gallery' trong 'color'
                        { path: 'size' }, // Điều hướng đến trường 'size' trong 'color'
                      ],
                }]
            }

            if (price_min && price_max) {
                filterPrice = {
                    $gte: parseInt(parseInt(price_min)), // Giá tối thiểu
                    $lte: parseInt(parseInt(price_max)), // Giá tối đa
                }
            }

            const response = await ProductService.getProductByCategory(slug, filterPrice, options)
             res.status(StatusCodes.OK).json(response);
        }catch(error) {
             next(error)
        }
    },

    getListProductRelated: async (req, res, next) => {
        try {
            const {categoryId} = req.params
            const { 
                removeId,
                limit=10,
            } = req.query
           
            const response = await ProductService.getListProductRelated(categoryId, removeId, limit)
             res.status(StatusCodes.OK).json(response);
        }catch(error) {
             next(error)
        }
    },

    // Get Product By Sub Category
    getProductBySubCategory: async (req, res, next) => {
        try {
            const slug = req.params.slug
            const { limit, } = req.query
          
            if(!slug || !limit ) {
                return res.status(412).json({
                    status: 'ERROR',
                    message: 'The input is required'
                })
            }
            const response = await ProductService.getProductBySubCategory(slug, limit)
             res.status(StatusCodes.OK).json(response);
        }catch (error) {
             next(error)
        }
    },

    // Get Details Product Id
    getProductById: async (req, res, next) => {
        try {
            
            const response = await ProductService.getProductById(req.params.id)
             res.status(StatusCodes.OK).json(response);
        }catch(error) {
             next(error)
        }
    },

    
    //Delete Product
    deleteProduct: async (req, res, next) => {
        try {
            const {publicId} = req.query
            
            const response = await ProductService.deleteProduct(req.params.id, publicId)
             res.status(StatusCodes.OK).json(response);
        }catch(error) {
             next(error)
        }
    },
    
    // Create Size
    createSize: async (req, res, next) => {
        try {
            const response = await ProductService.createSize(req.body)
             res.status(StatusCodes.OK).json(response);
        }catch(error) {
             next(error)
        }
    },

    // Get Size
    getProductSize: async (req, res, next) => {
        try {
            const {id} = req.params
            if(!id) {
                return res.status(404).json({
                    status: 'Error',
                    message: 'The id is required',
                })
            }
            const response = await ProductService.getProductSize(id)
             res.status(StatusCodes.OK).json(response);
        }catch (error) {
             next(error)
        }
    },

}






module.exports = ProductController