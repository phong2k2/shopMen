const express = require('express');
const Product = require('../app/model/Product');
const Category = require('../app/model/Category');
const Subcategory = require('../app/model/SubCategory');
const ProductColor = require('../app/model/ProductColor');
const ProductSize = require('../app/model/ProductSize');
const path = require('path');
const fs = require('fs');

//Search Product
const searchProduct =  ({q, page, limit}) => {
    return new Promise( async (resolve, reject) => {
        try {
            const skipPage = (page-1) * limit
            const products = await Product.find({name: {$regex: q, $options: "i"}})
            .sort({createdAt: -1, updatedAt: -1})
            .limit(limit)
            .skip(skipPage)


            const total = await Product.countDocuments({
                name: { $regex: q, $options: "i" },
            });
            resolve({
                status: 'Success',
                message: 'Search successfully',
                total: total,
                data: products
            })
        }catch (err) {
            reject({
                status: 'Error',
                message: 'Failed to search product',
                error: err
            })
        }
    })
}

// Add Product
const createProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({name: data.name})
            if (checkProduct !== null) {
                return resolve({
                    status: 'NAN',
                    message: 'The name of Product is already ',
                })
            }
            const newProduct = await Product.create(data)
            if(newProduct) {
                if(data.category) {
                    const updatedCategory = await Category.findOneAndUpdate(
                    { _id: data.category }, // Điều kiện tìm kiếm
                    { $push: { product: newProduct._id } }, // Toán tử $push để cập nhật mảng
                    { new: true } // Option để trả về tài liệu đã được cập nhật
                    );
                    
                    if(updatedCategory === null) {
                        const updateSubCategory = await Subcategory.findOneAndUpdate(
                        { _id: data.category }, // Điều kiện tìm kiếm
                        { $push: { product: newProduct._id } }, // Toán tử $push để cập nhật mảng
                        { new: true } // Option để trả về tài liệu đã được cập nhật
                        ); 
                    }

                }
                 resolve({
                    status: 'success',
                    message: 'Product created successfully',
                    data: newProduct
                })
            }
        }catch(err) {
            reject({
                status: 'Error',
                message: 'Failed to get Product',
                error: err
            })
        }
    })
}

// Update product
const updateProduct = (id, info) => {
    return new Promise(async (resolve, reject) => {
        try {

            const checkProduct = await Product.findOne({_id: id})
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            // Xóa ảnh cũ
            if ( checkProduct.image !== info.image) {
                const oldImagePath = path.join('src/public/images', checkProduct.image);
                
                console.log('__dirname', fs.existsSync(oldImagePath))
                if (fs.existsSync(oldImagePath)) {
                    // Xóa ảnh cũ
                    fs.unlinkSync(oldImagePath);
                    console.log('Old image deleted:', oldImagePath);
                }
            }

            const updateProduct = await Product.findOneAndUpdate({_id: id}, info, {new: true})
            resolve({
                status: 'Success',
                message: 'Successful request',
                data: updateProduct
            })
        } catch (err) {
            reject({
                status: 'Error',
                message: 'Failed to get Product',
                error: err
            })
        }
    })
}

//GetAll Products
const getAllProducts = ({limit = 10, page, sort, filter}) => {
    return new Promise( async (resolve, reject) => {
        try {
            const totalProduct = await Product.count()
            let allProducts = []
            // search for product
            if(filter) {
                const label = filter[0]
                const allObjectsFilter = await Product.find({
                    [label]:{'$regex': filter[1]}
                })
                .limit(limit)
                .sort({createdAt: -1, updatedAt: -1})
                .populate('category')
                .populate('subCategory')

                resolve({
                    status: 'Success',
                    message: 'Successful request',
                    countProduct: totalProduct,
                    data: allObjectsFilter
                })
            }

            // Arrange
            if(sort) {
                const objectSort = {}
                objectSort[sort[0]] = sort[1]
                const allProductSort = await Product.find()
                .limit(limit)
                .skip((page * limit) - limit)
                .sort(objectSort)
                .sort({createdAt: -1, updatedAt: -1})
                .populate('category')
                .populate('subCategory')

                resolve({
                    status: 'Success',
                    message: 'Successful request',
                    countProduct: totalProduct,
                    data: allProductSort
                })
            }   
            
            if(!limit) {
                allProducts = await Product.find()
                .sort({createdAt: -1, updatedAt: -1})
                .populate('category')
                .populate('subCategory')
            }else {
                allProducts = await Product.find()
                .limit(limit)
                .skip((page - 1) * limit)
                .sort({createdAt: -1, updatedAt: -1})
                .populate('category')
                .populate('subCategory')
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: allProducts,
                total: totalProduct,
            })
        }catch(err) {
            reject({
                status: 'Error',
                message: 'Failed to get Product',
                error: err
            })
        }
    })
}


// Get Product Detail 
const getDetailsProduct = (slug) => {
    return new Promise( async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                slug: slug,
            }).populate('category',['name'])
            
            if(product === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }
            // const listProduct = {
            //     ...product._doc,
            //     'image': `http://localhost:3000/${product._doc.image}`
            // }
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: product
            })
        }catch (err) {
            reject({
                status: 'Error',
                message: 'Failed to get Product Detail',
                error: err
            })
        }
    })
}


// Get Product Detail Id
const getDetailsProductId = ( id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id,
            })
            
            if(product === null) {
                reject({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }
            // const listProduct = {
            //     ...product._doc,
            //     'image': `http://localhost:3000/${product._doc.image}`
            // }
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: product
            })
        }catch (err) {
            reject({
                status: 'Error',
                message: 'Failed to get Product Detail',
                error: err
            })
        }
    })
}

//Get Product By Category
const getProductByCategory = (slug, limit, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            const skipPage = page  * limit 
            const category = await Category.findOne({ slug: slug });
            if(category) {
                const productCount = await Product.countDocuments({ category: category._id });
                const product = await Product.find({
                    $and: [
                    { category: category._id }
                ]})
                .skip(skipPage)
                .limit(limit)
                .sort({ createdAt: -1 })

                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: {
                        totalProducts: productCount,
                        product,
                        nameCategory: category?.name
                    }
                })
            }
        }catch(err) {
            reject({
                status: 'Error',
                message: 'Failed to get Product Detail',
                error: err
            })
        }
    })
}

// Get Product By Sub Category
const getProductBySubCategory = (slug, limit, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            const skipPage = page  * limit 
            const subcategory = await Subcategory.findOne({ slug: slug });
            if(subcategory) {
                const productCount = await Product.countDocuments({ subCategory: subcategory._id });
                const product = await Product.find({
                    $and: [
                    { subCategory: subcategory._id }
                ]})
                .skip(skipPage)
                .limit(limit)
                .sort({ createdAt: -1 })
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: {
                        totalProducts: productCount,
                        product,
                        nameCategory: subcategory?.name
                    }
                })
            }
        }catch(err) {
            reject({
                status: 'Error',
                message: 'Failed to get Product Detail',
                error: err
            })
        }
    })
}

// Delete product
const deleteProduct = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            
            const checkDeleteProduct = await Product.findOne({_id: id});
            if (!checkDeleteProduct) {
                return reject({
                    status: 'Error',
                    message: 'No products found',
                })
            }
            await Category.updateMany(
                { product: id },
                { $pull: { product: id } }
              );

            await Product.findOneAndDelete({_id: id})
             resolve({
                status: 'OK',
                message: 'Delete Success',
            })
        }catch(err)  {
            reject({
                status: 'Error',
                message: 'Failed to delete Product',
                error: err
            })
        }
    })
}

// Create variant
const createColor = (valueColor) => {
    return new Promise( async (resolve, reject) => {
        const { color, image, product} = valueColor
        try {
            const existingColor = await ProductColor.findOne({
                color: color,
                product: product,
            });

            if(existingColor) {
                return reject({
                    status: 'Error',
                    message: 'Variations already exist',
                })
            }
            

            const newColor = await ProductColor.create({
                color,
                image,
                product
            })
         

            if(newColor) {
                resolve({
                    status: 'Success',
                    message: 'Successful request',
                    data: newColor
                })
            }
        }catch(err) {
            reject({
                status: 'Error',
                message: 'Failed to crate variant',
                error: err
            })
        }
    })
}

// get Product Color
const getProductColor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allColor = await ProductColor.find({
                product: id
            })
            resolve({
                status: 'Success',
                message: 'Successful request',
                data: allColor
            })
        }catch(err) {
            reject(err)
        }
    })
}

const deleteColor = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const checkColor = await ProductColor.findOne({_id: id});
            if(!checkColor) {
                return resolve({
                    message: 'Not found color'
                })
            }
            await ProductColor.findOneAndDelete({_id: id});
            resolve({
                status: 'Success',
                message: 'Delete Successful',
            })
        }catch (err) {
            reject(err)
        }
    })
}

// Create size
const createSize = (valueSize) => {
    return new Promise(async (resolve, reject) => {
        const {size, product} = valueSize
        try {
            const existingVariant = await ProductSize.findOne({
                size: size,
                product: product,
            });

            if(existingVariant) {
                return reject({
                    status: 'Error',
                    message: 'Variations already exist',
                })
            }

            const newSize = await ProductSize.create({
                size,
                product
            })
               
            if(newSize) {
                resolve({
                    status: 'Success',
                    message: 'Successful request',
                    data: newSize
                })
            }
        }catch(err) {
            reject(err);
        }
    })
}


// get Product Color
const getProductSize = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allSize = await ProductSize.find({
                product: id
            })
            resolve({
                status: 'Success',
                message: 'Successful request',
                data: allSize
            })
        }catch(err) {
            reject(err)
        }
    })
}

//Delete size
const deleteSize = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const checkColor = await ProductSize.findOne({_id: id});
            if(!checkColor) {
                return resolve({
                    message: 'Not found color'
                })
            }
            await ProductSize.findOneAndDelete({_id: id});
            resolve({
                status: 'Success',
                message: 'Delete Successful',
            })
        }catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    getAllProducts,
    deleteProduct,
    getDetailsProduct,
    getDetailsProductId,
    createColor,
    getProductColor,
    deleteColor,
    createSize,
    getProductSize,
    deleteSize,
    searchProduct,
    getProductBySubCategory,
    getProductByCategory
}