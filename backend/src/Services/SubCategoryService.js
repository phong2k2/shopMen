const {ObjectId} = require('mongodb');
const {StatusCodes} = require('http-status-codes');
const SubCategory = require('../app/model/SubCategory')
const Category = require('../app/model/Category')
const {uploadToCloudinary, deleteAnCloudinary} = require('../Services/CloudinaryService');
const ApiError = require('../utils/ApiError');
const Product = require('../app/model/Product');

// Get SubCategory Service
const getSubCategory = async () => {
        try {
            const getAllSubCate = await SubCategory.find({})
            
            return {
                data: getAllSubCate
            }
        } catch (error) {
            throw error
        }
}

// Get An SubCategory

const getSubCategoryDetail = async (id) => {
        try {
            const subCategory = await SubCategory.findOne({
                _id: new ObjectId(id)
            })
            return {
                data: subCategory
            }
        }catch (error) {
            throw error
        }
}

// Get SubCategory By category
const getAllSubCategoryForCategory = async (categoryId) => {
        try {
            const allSubCategory = await SubCategory.find({
                category: new ObjectId(categoryId)
            }).populate('category', ['name'])
            
            return {
                data: allSubCategory
            }
        }catch (error) {
            throw error
        }
}

// Add SubCategory Service
const createSubCategory = async (name, category, fileData ) => {
        let publicIdToDelete;
        try {
            const checkSubCate = await SubCategory.findOne({ name: name })
            if(checkSubCate) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Sub category not found')
            }
            // Save image in cloudinary
            const result = await uploadToCloudinary(fileData.path, 'images-shop_men/category');
            publicIdToDelete = result.publicId;
            const newSubCategory = await SubCategory.create({
                name,
                image: result,
                category
            })

            if (newSubCategory) {
                // Add subcategory to category
                if(category) {
                    await Category.findOneAndUpdate(
                        { _id: category }, // Điều kiện tìm kiếm
                        { $push: { subCategory: newSubCategory._id } }, // Toán tử $push để cập nhật mảng
                        { new: true }
                    )
                }
                
                return {
                    data: newSubCategory
                }
            }
        } catch(error) {
            if (publicIdToDelete) {
                await deleteAnCloudinary(publicIdToDelete);
            }
            throw error

        }
}

// Update SubCategory Service
const updateSubCategory = async (id, data, fileData) => {
        let publicIdToDelete;
        try {
            const checkSubCatId = await SubCategory.findOne({_id: new ObjectId(id)})
            if (!checkSubCatId) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Sub category not found')
            }
            if(fileData) {
                const result = await uploadToCloudinary(fileData.path, 'images-shop_men/category');
                publicIdToDelete = result.publicId;
                if (result) data.image = result
            }

            const updateSubCategory = await SubCategory.findOneAndUpdate(
                {_id: new ObjectId(id)}, data, {new: true} 
            )
           
            return {
                data: updateSubCategory
            }
        }catch (error) {
            if (publicIdToDelete) {
                await deleteAnCloudinary(publicIdToDelete);
            }
            throw error
        }
}

// Delete SubCategory
const deleteSubCategory = async (id, publicId) => {
        try {
            const checkSubCate = await SubCategory.findOne({
                _id: new ObjectId(id)
            })
            if (!checkSubCate) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Sub category not found')
            }

            const checkProduct = await Product.findOne({subCategory: new ObjectId(id)})
            if (checkProduct) {
                throw new ApiError(StatusCodes.CONFLICT, 'Danh mục này không thể xóa')
            }

            await Category.updateMany(
                {subCategory: new ObjectId(id)},
                {$pull: {subCategory: new ObjectId(id)}}
            )
            await SubCategory.findByIdAndDelete({_id: new ObjectId(id)})
            // delete image cloudinary
            await deleteAnCloudinary(publicId);
            
            return {
                message: 'Delete Success',
            }
        }catch (error) {
            throw error
        }
}

module.exports = {
    getSubCategory,
    getSubCategoryDetail,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getAllSubCategoryForCategory
}