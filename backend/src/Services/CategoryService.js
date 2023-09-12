const Category = require('../app/model/Category')
const Product = require('../app/model/Product')
const Subcategory = require('../app/model/SubCategory')

const createCategory = (newCategory) => {
    return new Promise(async (resolve, reject) => {
        const {name, hot} = newCategory
        try {
            const checkCategory = await Category.findOne({name: name})
            if(checkCategory !== null) {
                return resolve({
                    status: 'Error',
                    message: 'The name of category is already'
                })
            }
            const newCategory = await Category.create({
                name,
                hot
            })
            if(newCategory) {
                resolve({
                    status: 'Success',
                    message: 'Successful request',
                    data: newCategory
                })
            }
        }catch(err) {
            reject({
                status: 'Error',
                message: 'Failed to create category',
                error: err
            });
        }
    })
}

const getAllCategories = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const getAllCategories = await Category.find({})
            resolve({
                status: 'Success',
                message: 'Successful request',
                data: getAllCategories
            })
        } catch (err) {
            reject({
                status: 'Error',
                message: 'Failed to get categories',
                error: err
            })
        }
    })
}

const getACategory = ({id, limit = 5, page}) => {
    return new Promise( async (resolve, reject) => {
        try {
            const skipPage = (page - 1) * limit
            const getACategory = await Category.findById(id).populate({
                path: 'product',
                options: { limit: limit, sort: { createdAt: -1 }, skip: skipPage },
              })
            if(getACategory === null) {
                return reject({
                    status: 'Error',
                    message: 'Failed to get pro in categories',
                    error: err
                })
            }
            resolve({
                status: 'Success',
                message: 'Successful request',
                data: getACategory
            })
        }catch(err) {
            reject({
                status: 'Error',
                message: 'Failed to get categories',
                error: err
            })
        }
    })
}

const getDetailCategory = ({slug, limit, page}) => {
    return new Promise( async (resolve, reject) => {
        try {
            const skipPage = page  * limit
            const category = await Category.findOne({ slug: slug });
            let countProduct
            if (category) {
                countProduct = await Product.countDocuments({
                    _id: { $in: category.product },
                });
             }
            const getDetailCategory = await Category.findOne({slug: slug}).populate({
                path: 'product',
                options: { limit: limit, sort: { createdAt: -1 }, skip: skipPage },
              })
            if(getDetailCategory === null) {
                return reject({
                    status: 'Error',
                    message: 'Failed to get pro in categories',
                    error: err
                })
            }
            resolve({
                status: 'Success',
                message: 'Successful request',
                countProduct: countProduct,
                data: getDetailCategory
            })
        }catch(err) {
            reject({
                status: 'Error',
                message: 'Failed to get categories',
                error: err
            })
        }
    })
}

const updateCategory = (id, data) => {
    return new Promise( async (resolve, reject) => {
        try {
            const checkCateId = await Category.findOne({_id: id})
            if(checkCateId === null) {
                return resolve({
                    status: "Error",
                    message: "The product is not defined"
                })
            }
            
            const updateCategory = await Category.findOneAndUpdate(
                { _id: id }, data, {new: true}
            )
            resolve({
                status: 'Success',
                message: 'Successful request',
                data: updateCategory
            })
        }catch (err) {
            reject({
                status: 'Error',
                message: 'Failed to update category',
                error: err
            });
        }
    })
}

const deleteCategory = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            await Category.deleteOne({_id: id})
            resolve({
                status: 'Success',
                message: 'Delete Success',
            })
        } catch (err) {
            reject({
                status: 'Error',
                message: 'Failed to update category',
                error: err
            });
        }
    })
}

module.exports = {
    getAllCategories,
    getACategory,
    createCategory,
    updateCategory,
    deleteCategory,
    getDetailCategory
}