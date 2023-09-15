const ProductService = require('../../Services/ProductService')


const ProductController = {
    // Add Product
    createProduct: async (req, res) => {
        try {
            const imgProduct = req.files.map(file => {
                return file.filename
            }) 
            let info = {
                name: req.body.name,
                price: req.body.price,
                discount: req.body.discount,
                image: imgProduct,
                countInStock: req.body.countInStock,
                description: req.body.description,
                hot: req.body.hot,
                category: req.body.category
            }
            if(info){
                const response = await ProductService.createProduct(info)
                res.status(200).json(response)
            }
        }catch(err) {
            res.status(404).json(err)
        }
    },

    // Upadte product 
    updateProduct: async (req, res) => {
        try {
            const imgProduct = req.files.map(file => {
                return file.filename
            }) 

            let info = {
                name: req.body.name,
                price: req.body.price,
                discount: req.body.discount,
                image: imgProduct,
                countInStock: req.body.countInStock,
                description: req.body.description,
                hot: req.body.hot,
                category: req.body.category
            }

            const proId = req.params.id
            if(!proId) {
                return res.status(404).json({
                    status: 404,
                    message: 'Id product not found'
                })
            }
            if(info) {
                const response = await ProductService.updateProduct(proId, info)
                res.status(200).json(response)
            }
        }catch (err) {
            res.status(500).json(err)
        }
    },
    
    //GetAll Products
    getAllProducts: async (req, res) => {
        try {
            const response = await ProductService.getAllProducts(req.query)
            res.status(200).json(response)
        }catch(err) {
            res.status(500).json(err)
        }
    },

    // Get product by category
    // getProductsByCategory: async (req, res) => {
    //     try {
    //         const response = await ProductService.getProductsByCategory(req.params.slug)
    //         res.status(200).json(response)
    //     }catch(err) {
    //         res.status(500).json(err)
    //     }
    // },

    
    // Get Details Product
    getDetailsProduct: async (req, res) => {
        
        if(req.params.slug === null) {
            return res.status(412).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        try {
            const response = await ProductService.getDetailsProduct(req.params.slug)
            res.status(200).json(response)
        }catch(err) {
            res.status(500).json(err)
        }
    },

    // Get Details Product Id
    getDetailsProductId: async (req, res) => {
        if(req.params.id === null) {
            return res.status(412).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        try {
            const response = await ProductService.getDetailsProductId(req.params.id)
            res.status(200).json(response)
        }catch(err) {
            res.status(500).json(err)
        }
    },

    
    //Delete Product
    deleteProduct: async (req, res) => {
        try {
            if(!req.params.id) {
                return res.status(404).json({
                    status: 'Error',
                    message: 'The id is required',
                })
            }
            const response = await ProductService.deleteProduct(req.params.id)
            res.status(200).json(response)
        }catch(err) {
            res.status(500).json(err)
        }
    },

    
}




module.exports = ProductController