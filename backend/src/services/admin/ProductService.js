const { StatusCodes } = require("http-status-codes");
const Product = require("../../app/model/Product");
const Category = require("../../app/model/Category");
const Subcategory = require("../../app/model/SubCategory");
const productTransformer = require("../../transformer/admin/product");
const ApiError = require("../../utils/ApiError");

// Get Product Detail
const getProductDetail = async (filter, options) => {
  try {
    const data = await Product.paginate({ ...filter }, options);
    return productTransformer.getProduct(data);
  } catch (error) {
    throw error;
  }
};

// Add Product
const createProduct = async (body) => {
  try {
    const checkProduct = await Product.findOne({ name: body.name });
    if (checkProduct) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Product not found");
    }
    const newProduct = await Product.create({
      ...body,
    });
    if (body.category) {
      const updateCategory = Category.findOneAndUpdate(
        { _id: body.category },
        { $push: { product: newProduct._id } },
        { new: true }
      );

      const updateSubcategory = Subcategory.findOneAndUpdate(
        { _id: body.category },
        { $push: { product: newProduct._id } },
        { new: true }
      );
      await Promise.all([updateCategory, updateSubcategory]);
    }
    return {
      data: newProduct,
    };
  } catch (error) {
    throw error;
  }
};

// Update product
const updateProduct = async (proSlug, body, fileData) => {
  try {
    const checkProduct = await Product.findOne({ slug: proSlug });
    if (!checkProduct) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Product not found");
    }

    const updateProduct = await Product.findOneAndUpdate(
      { slug: proSlug },
      body,
      { new: true }
    );

    return {
      data: updateProduct,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getProductDetail,
  createProduct,
  updateProduct,
};
