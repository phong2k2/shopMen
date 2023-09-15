const Product = require('../app/model/Product');
const Category = require('../app/model/Category');
const Subcategory = require('../app/model/SubCategory');
const { updateCategory } = require('./CategoryService');

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
            const checkProduct = await Product.find({_id: id})
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
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
                }).limit(limit).sort({createdAt: -1, updatedAt: -1})

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
                const allProductSort = await Product.find().limit(limit).skip((page * limit) - limit).sort(objectSort).sort({createdAt: -1, updatedAt: -1})
                resolve({
                    status: 'Success',
                    message: 'Successful request',
                    countProduct: totalProduct,
                    data: allProductSort
                })
            }   
            
            if(!limit) {
                allProducts = await Product.find().sort({createdAt: -1, updatedAt: -1})
            }else {
                allProducts = await Product.find().limit(limit).skip((page - 1) * limit).sort({createdAt: -1, updatedAt: -1})
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
const getDetailsProductId = (id) => {
    return new Promise( async (resolve, reject) => {
        console.log(id)
        try {
            const product = await Product.findOne({
                _id: id,
            })
            
            if(product === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }
            const listProduct = {
                ...product._doc,
                'image': `http://localhost:3000/${product._doc.image}`
            }
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: listProduct
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

module.exports = {
    createProduct,
    updateProduct,
    getAllProducts,
    deleteProduct,
    getDetailsProduct,
    getDetailsProductId
}