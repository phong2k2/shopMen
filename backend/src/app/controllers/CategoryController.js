const CategoryService = require('../../Services/CategoryService')

const CategoryController = {
    // ADD Category 
    createCategory: async (req, res) => {
        try {
            const { name } = req.body
            if (!name) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The input is required'
                })
            }
            const response = await CategoryService.createCategory(req.body)
             res.status(200).json(response)
        }catch(err) {
            res.status(500).json({
                message: err
            })
        }
    },
    // GET ALL Categoies
    getAllCategories: async (req, res) => {
        try {
            const response = await CategoryService.getAllCategories()
             res.status(200).json(response)
        }catch(err) {
            res.status(500).json({
                message: err
            })
        }
    },
    

    //Get an category by slug
    getDetailCategory: async (req, res) => {
        try {
            const slug = req.params.slug
            const { limit, page} = req.query
                console.log(limit, page)
            if(!slug) {
                return res.status(412).json({
                    status: 'ERR',
                    message: 'The input is required'
                })
            }
            const response = await CategoryService.getDetailCategory({slug, limit, page})
            res.status(200).json(response)
        }catch (err) {
            res.status(500).json({
                message: err
            })
        }
    },

    // Get A Category
    getACategory: async (req, res) => {
        try {
            const id = req.params.id
            const { limit , page } = req.query
            if(!id & limit || page ) {
                return res.status(412).json({
                    status: 'ERR',
                    message: 'The input is required'
                })
            }
            const response = await CategoryService.getACategory({id, limit, page})
            res.status(200).json(response)
        }catch(err) {
            res.status(500).json({
                message: err
            })
        }
    },
    // Update Category
    updateCategory: async (req, res) => {
        try {
            const cateId = req.params.id;
            const data = req.body;
            const response = await CategoryService.updateCategory(cateId, data)
            res.status(200).json(response); 
        } catch (err) {
            res.status(500).json({
                message: err
            });
        }
    },
    // Delete Category
    deleteCategory: async (req, res) => {
        try {
            cateId = req.params.id
            if (!cateId) {
                return res.status(412).json({
                    status: 'ERR',
                    message: 'The productId is required'
                })
            }
            const response = await CategoryService.deleteCategory(cateId)
            res.status(200).json(response);
        }catch(err) {
            res.status(500).json({
                message: err
            });
        }
    }
}

module.exports = CategoryController