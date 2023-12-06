const {ObjectId} = require('mongodb');
const {StatusCodes} = require('http-status-codes');
const Category = require('../app/model/Category')
const Product = require('../app/model/Product')
const ApiError = require('../utils/ApiError')


const createCategory = async (newCategory) => {
    const {name} = newCategory
    try {
        const checkCategory = await Category.findOne({name: name})
        if(checkCategory) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Category not found')
        }
        const newCategory = await Category.create({
            name
        })
        return {
            data: newCategory
        }
    }catch(error) {
        throw error
    }
}

const getAllCategories = async () => {
    try {
        const getAllCategories = await Category.find({}).populate('subCategory')
        return {
            data: getAllCategories
        }  
    } catch (error) {
        throw error
    }
}

const getCategoryDetail = async (id) => {
        try {
            const getCategoryDetail = await Category.findById({_id: new ObjectId(id)})
            if(!getCategoryDetail) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Category not found')
            }
            return {
                data: getCategoryDetail
            }  
            
        }catch(error) {
            throw error
        }
}

const getDetailCategory = async (slug) => {
        try {

            const getDetailCategory = await Category.findOne({slug: slug})

            if(!getDetailCategory) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Category not found')
            }
            return {
                data: getDetailCategory
            } 
        }catch(error) {
            throw error
        }
}


const updateCategory = async (id, data) => {
    try {
        const checkCateId = await Category.findOne({_id: new ObjectId(id)})
        if(!checkCateId) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Category not found')
            }
            
            const updateCategory = await Category.findOneAndUpdate(
                { _id: id }, data, {new: true}
            )
            return {
                data: updateCategory
            } 
        }catch (error) {
            throw error
        }
}

const deleteCategory = async (id) => {
        try {
            await Product.updateMany(
                { category: new ObjectId(id) },
                { category: null }
            );

            await Category.deleteOne({_id: new ObjectId(id)})
            return {
                message: 'Delete Success',
            } 
            
        } catch (error) {
            throw error
        }
}

module.exports = {
    getAllCategories,
    getCategoryDetail,
    createCategory,
    updateCategory,
    deleteCategory,
    getDetailCategory
}