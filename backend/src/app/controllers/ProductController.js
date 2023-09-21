const ProductService = require('../../Services/ProductService')



const ProductController = {
    // Add Product
    createProduct: async (req, res) => {
        try {
            const info = {
                ...req.body,
                image: req.file.filename,
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
            const urlImage = req.body.image ? req.body.image : req.file.filename 
            const infoUpdate = {
                ...req.body,
                image: urlImage
            }

            const proId = req.params.id
            if(!proId) {
                return res.status(404).json({
                    status: 404,
                    message: 'Id product not found'
                })
            }
            if(infoUpdate) {
                const response = await ProductService.updateProduct(proId, infoUpdate)
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

    // Create color
    createColor: async (req, res) => {
        try {
            const imgColor = req.files.map(file => {
                return file.filename
            }) 
            
            const valueColor = {
                ...req.body,
                image: imgColor
            }
            const response = await ProductService.createColor(valueColor)
            res.status(200).json(response)
        }catch(err) {
            res.status(500).json(err)
        }
    },

    //Get  color
    getProductColor: async (req, res) => {
        try {
            const id = req.params.id
            if(!id) {
                return res.status(404).json({
                    status: 'Error',
                    message: 'The id is required',
                })
            }
            const response = await ProductService.getProductColor(id)
            res.status(200).json(response)
        }catch (err) {
            res.status(500).json(err)
        }
    },

    //Delete Color
    deleteColor: async (req, res) => {
        try {
            const id = req.params.id
            if(!id) {
                return res.status(404).json({
                    status: 'Error',
                    message: 'The id is required',
                })
            }
            const response = await ProductService.deleteColor(id)
            res.status(200).json(response)
        }catch (err) {
            res.status(500).json(err)
        }
    },

    // Create Size
    createSize: async (req, res) => {
        console.log(req.body)
        try {
            const response = await ProductService.createSize(req.body)
            res.status(200).json(response)
        }catch(err) {
            res.status(500).json(err)
        }
    },

    // Get Size
    getProductSize: async (req, res) => {
        try {
            const id = req.params.id
            if(!id) {
                return res.status(404).json({
                    status: 'Error',
                    message: 'The id is required',
                })
            }
            const response = await ProductService.getProductSize(id)
            res.status(200).json(response)
        }catch (err) {
            res.status(500).json(err)
        }
    },

    deleteSize:async(req, res) => {
        try {
            const id = req.params.id
            if(!id) {
                return res.status(404).json({
                    status: 'Error',
                    message: 'The id is required',
                })
            }
            const response = await ProductService.deleteSize(id)
            res.status(200).json(response)
        }catch (err) {
            res.status(500).json(err)
        }
    },

    //Search Product
    searchProduct: async (req, res) => {
        try {
            const {q, page, type} = req.query
            if(!q && !type) {
                return res.status(404).json({
                    status: 'Error',
                    message: 'Request not received',
                })
            }
            const props = {
                'less': 5,
                'more': 10
            }
            const limit = props[type]
            const response = await ProductService.searchProduct({q, page, limit})
            res.status(200).json(response)
        }catch (err) {
            res.status(500).json(err)
        }
    }
}




module.exports = ProductController