const {ObjectId} = require('mongodb');
const {StatusCodes} = require('http-status-codes');
const Product = require('../app/model/Product');
const Category = require('../app/model/Category');
const Subcategory = require('../app/model/SubCategory');
const ApiError = require('../utils/ApiError')
const {uploadToCloudinary, deleteAnCloudinary} = require('../Services/CloudinaryService');
const SubCategory = require('../app/model/SubCategory');



//Search Product
const searchProduct = async (q, page, limit) => {
        try {
            const skipPage = (page-1) * limit
            const products = await Product.find({name: {$regex: q, $options: "i"}})
            .sort({createdAt: -1, updatedAt: -1})
            .limit(limit)
            .skip(skipPage)

            const total = await Product.countDocuments({
                name: { $regex: q, $options: "i" },
            });
            return {
                total: total,
                data: products
            }
        }catch (error) {
            throw error
        }
}

// Add Product
const createProduct = async (body, fileData) => {
    let publicIdToDelete;
    try {
        const checkProduct = await Product.findOne({name: body.name})
        if (checkProduct) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found')
        }
        const result = await uploadToCloudinary(fileData.path);
        publicIdToDelete = result.publicId;

        const newProduct = await Product.create({
            ...body,
            image: result
        })
        if(body.category) {
            const updateCategory =  Category.findOneAndUpdate(
            { _id: body.category }, // Điều kiện tìm kiếm
            { $push: { product: newProduct._id } }, // Toán tử $push để cập nhật mảng
            { new: true } // Option để trả về tài liệu đã được cập nhật
            );
            
            const updateSubcategory = Subcategory.findOneAndUpdate(
                { _id: body.category }, // Điều kiện tìm kiếm
                { $push: { product: newProduct._id } }, // Toán tử $push để cập nhật mảng
                { new: true } // Option để trả về tài liệu đã được cập nhật
            ); 
            await Promise.all([updateCategory, updateSubcategory]);

        }
        return {
            data: newProduct
        }
    }catch(error) {
        if (publicIdToDelete) {
            await deleteAnCloudinary(publicIdToDelete);
        }
        throw error
    }
}

// Update product
const updateProduct = async (proSlug, body, fileData) => {
        let publicIdToDelete;
        try {
            const checkProduct = await Product.findOne({slug: proSlug})
            if (!checkProduct) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found')
            }
            if(fileData) {
                const result = await uploadToCloudinary(fileData.path);
                publicIdToDelete = result.publicId;
                if (result) body.image = result
            }

            const updateProduct = await Product.findOneAndUpdate({slug: proSlug}, body, {new: true})
            
            return {
                data: updateProduct
            }
        } catch (error) {
            if (publicIdToDelete) {
                await deleteAnCloudinary(publicIdToDelete);
            }
            throw error
        }
}

//GetAll Products
const getAllProducts = async ({limit = 10, page, sort, filter}) => {
        try {
            let allProducts 
            const totalProduct = await Product.count()
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

                
                return {
                    countProduct: totalProduct,
                    data: allObjectsFilter
                }
            }
            // Arrange
            if(sort) {
                const objectSort = {}
                if(sort.indexOf('-')) {
                    const newSort = sort.split('-')
                    objectSort[newSort[0]] = newSort[1]
                }
                const allProductSort = await Product.find({})
                .limit(limit)
                .skip((page * limit) - limit)
                .sort(objectSort)
                .sort({createdAt: -1, updatedAt: -1})
                .populate('category')
                .populate('subCategory')
                
                
                return {
                    countProduct: totalProduct,
                    data: allProductSort
                }
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

            
            return {
                total: totalProduct,
                data: allProducts,
            }
        }catch(error) {
            throw error
        }
}

const getAllProductsForHome = async ({limit = 15}) => {
        try {
            let allProducts = await Product.find()
                .sort({createdAt: -1, updatedAt: -1})
                .limit(limit)
                .populate('category')
                .populate('subCategory')
            
            return {
                data: allProducts,
            }
        }catch(error) {
            throw error
        }
}


// Get Product Detail 
const getProductBySlug = async (slug) => {
        try {
            const product = await Product.findOne({
                slug: slug,
            })
            .populate('category')
            .populate({
                path: 'color', // Điều hướng đến trường 'color'
                populate: [
                    { path: 'gallery' }, // Điều hướng đến trường 'gallery' trong 'color'
                    { path: 'size' }, // Điều hướng đến trường 'size' trong 'color'
                  ],
            })
            

            
            return {
                data: product,
            }
        }catch (error) {
            throw error
        }
}


// Get Product Detail Id
const getProductById = async (id) => {
        try {
            const product = await Product.findOne({
                _id: new ObjectId(id),
            })
            
            return {
                data: product,
            }
        }catch (error) {
            throw error
        }
}

//Get Product By Category
const getProductByCategory = async (slug, filterPrice, options) => {
        try {
            let productQuery = '';
            // Kiểm tra xem slug có tương ứng với danh mục con hay không
            const subCategory = await SubCategory.findOne({ slug: slug });
            
            if (subCategory) {
                // Nếu slug tương ứng với danh mục con, sử dụng subCategory ID
                productQuery = { 
                    subCategory: subCategory._id
                };

            } else {
                // Nếu không phải danh mục con, tìm danh mục chính và sử dụng category ID
                const category = await Category.findOne({ slug: slug });

                if (category) {
                    productQuery = {
                        category: category._id,
                    };
                } else {
                    throw new ApiError(StatusCodes.NOT_FOUND, 'Category not found')
                }
            }
            if(filterPrice) {
                productQuery.price = filterPrice
            }
            const products = await Product.paginate(productQuery, options)
                   
            return {
                data: products,
            }
        }catch(error) {
            throw error
        }
}



//Get Product Related
const getListProductRelated = async (categoryId, removeId, limit) => {
        try {
            const allProduct = await Product.find({
                category: categoryId,
                _id: { $ne: removeId },
              })
            .limit(limit)

            return {
                data: allProduct,
            }
        }catch(error) {
            throw error
        }
}

// Get Product By Sub Category
const getProductBySubCategory = async (slug, limit) => {
        try {
            const subcategory = await Subcategory.findOne({ slug: slug });
            if(subcategory) {
                const product = await Product.find(
                    { subCategory: subcategory._id }
                )
                .limit(limit)
                .sort({ createdAt: -1 })
                .populate('category', 'subCategory')
                
                return {
                    data: product,
                }
            }
        }catch(error) {
            throw error
        }
}

// Delete product
const deleteProduct = async (id, publicId) => {
        try {
            const checkDeleteProduct = await Product.findOne({_id: new ObjectId(id)});
            if (!checkDeleteProduct) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found')
            }
            await Category.updateMany(
                { product: id },
                { $pull: { product: new ObjectId(id) } }
            );

            await Product.findOneAndDelete({_id: new ObjectId(id)})
              
            // delete image cloudinary
            await deleteAnCloudinary(publicId);

            return {
                message: 'Delete Success',
            }
        }catch(error)  {
            throw error
        }
}


module.exports = {
    createProduct,
    updateProduct,
    getAllProducts,
    getAllProductsForHome,
    deleteProduct,
    getProductBySlug,
    getProductById,
    searchProduct,
    getProductBySubCategory,
    getProductByCategory,
    getListProductRelated
}