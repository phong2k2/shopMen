const SubCategory = require('../app/model/SubCategory')
const Category = require('../app/model/Category')

// Get SubCategory Service
const getSubCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const getAllSubCate = await SubCategory.find({})
            if(getAllSubCate) {
                resolve({
                    status: 'Success',
                    message: 'Successful request',
                    data: getAllSubCate
                })
            }
        } catch (err) {
            reject({
                status: 'Error',
                message: 'Failed to get',
                error: err
            })
        }
    })
}

// Add SubCategory Service
const createSubCategory = ({name, description, category} ) => {
    return new Promise( async (resolve, reject) => {
        try {
            const checkSubCate = await SubCategory.findOne({ name: name })
            if(checkSubCate !== null) {
                return reject({
                    status: 'Error',
                    message: 'The name subcategory is already'
                })
            }
            const newSubCategory = await SubCategory.create({
                name,
                description
            })
            if (newSubCategory) {
                // Add subcategory to category
                if(category) {
                    const updateCategory = await Category.findById(category)
                    await updateCategory.updateOne({$push: {subcategories: newSubCategory._id}})
                }
                resolve({
                    status: 'Success',
                    message: 'Successful request',
                    data: newSubCategory
                })
            }
        } catch(err) {
            reject(err)
        }
    })
}

// Update SubCategory Service
const updateSubCategory = (id, data) => {
    return new Promise( async (resolve, reject) => {
        try {
            const checkSubCatId = await SubCategory.findOne({_id: id})
            if (checkSubCatId === null) {
                return reject({
                    status: 'Error',
                    message: "The subCategory is not defined"
                })
            }
            const updateSubCategory = await SubCategory.findOneAndUpdate(
                {_id: id}, data, {new: true} 
            )
            resolve({
                status: 'Success',
                message: 'Successful request',
                data: updateSubCategory
            })
        }catch (err) {
            reject({
                status: 'Error',
                message: 'Failed to get',
                error: err
            })
        }
    })
}

// Delete SubCategory
const deleteSubCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Category.updateMany(
                {subcategories: id},
                {$pull: {subcategories: id}}
            )
            await SubCategory.findByIdAndDelete({_id: id})
            resolve({
                status: 'Success',
                message: 'Delete Success',
            })
        }catch (err) {
            reject({
                status: 'Error',
                message: 'Failed to get',
                error: err
            }) 
        }
    })
}

module.exports = {
    getSubCategory,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory
}