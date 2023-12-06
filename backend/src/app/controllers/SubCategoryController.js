const SubCategoryService = require('../../Services/SubCategoryService')
const {StatusCodes} = require('http-status-codes');

const SubCategoryController = {
    // Get SubCategory
    getSubCategory: async (req, res, next) => {
        try {
            const response = await SubCategoryService.getSubCategory()
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
           next(error)
        }
    },
    
    getSubCategoryDetail: async (req, res, next) => {
        try {
            const {id} = req.params;
            
            const response = await SubCategoryService.getSubCategoryDetail(id)
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            next(error)
        }
    },
    //Get Sub category by Category
    getAllSubCategoryForCategory: async (req, res, next) => {
        try {
            const {categoryId} = req.params;
            const response = await SubCategoryService.getAllSubCategoryForCategory(categoryId)
            res.status(StatusCodes.OK).json(response);
        }catch (error) {
            next(error)
        }
    },

    // Update SubCategory
    updateSubCategory: async (req, res, next) => {
        try {
            const fileData = req.file
            const {id} = req.params;
            const data = req.body
            const response = await SubCategoryService.updateSubCategory(id, data, fileData)
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            next(error)
        }
    },
    // Add SubCategory
    createSubCategory: async (req, res, next) => {
        try {
            const fileData = req.file
            const {name, category} = req.body

            const response = await SubCategoryService.createSubCategory(name, category, fileData)
            res.status(StatusCodes.CREATED).json(response);
        }catch(error) {
            next(error)
        }
    },
    // Delete SubCategory
    deleteSubCategory: async (req, res, next) => {
        try {
            const {publicId} = req.query
            console.log(req.params.id)
            const subCategoryId = req.params.id
            
            const response = await SubCategoryService.deleteSubCategory(subCategoryId, publicId)
            res.status(StatusCodes.OK).json(response);
        }catch (error) {
            next(error)
        }
    }
}

module.exports = SubCategoryController