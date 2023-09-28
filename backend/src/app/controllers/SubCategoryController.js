const SubCategoryService = require('../../Services/SubCategoryService')

const SubCategoryController = {
    // Get SubCategory
    getSubCategory: async (req, res) => {
        try {
            const response = await SubCategoryService.getSubCategory()
            res.status(200).json(response);
        } catch (err) {
            res.status(404).json(err);
        }
    },
    
    getDetailSubCategory: async (req, res) => {
        try {
            const id = req.params.id;
            if(!id) {
                res.status(401).json({
                    status: 'Error',
                    message: "Id category is required"
                })
            }
            const response = await SubCategoryService.getDetailSubCategory(id)
            res.status(200).json(response);
        } catch (err) {
            res.status(404).json(err);
        }
    },
    //Get Sub category by Category
    getSubCategoryByCategory: async (req, res) => {
        try {
            const id = req.params.id;
            if(!id) {
                res.status(401).json({
                    status: 'Error',
                    message: "Id category is required"
                })
            }
            const response = await SubCategoryService.getSubCategoryByCategory(id)
            res.status(200).json(response)
        }catch (err) {
            res.status(401).json(err)
        }
    },

    // Update SubCategory
    updateSubCategory: async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body
            const response = await SubCategoryService.updateSubCategory(id, data)
            res.status(200).json(response);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Add SubCategory
    createSubCategory: async (req, res) => {
        try {
            const {name, category} = req.body
            console.log(req.body)
            if(!name && !category) {
                return res.status(200).json({
                    status: 'Error',
                    message: 'The input is required'
                })
            }
            const response = await SubCategoryService.createSubCategory(req.body)
            res.status(200).json(response)
        }catch(err) {
            res.status(500).json(err)
        }
    },
    // Delete SubCategory
    deleteSubCategory: async (req, res) => {
        try {
            const subCategoryId = req.params.id
            if (!subCategoryId) {
                return res.status(411).json({
                    status: 'Error',
                    message: 'The input is required'
                }) 
            }
            const response = await SubCategoryService.deleteSubCategory(subCategoryId)
            res.status(200).json(response)
        }catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = SubCategoryController