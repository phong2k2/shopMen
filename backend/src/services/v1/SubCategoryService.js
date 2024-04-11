const { ObjectId } = require("mongodb");
const { StatusCodes } = require("http-status-codes");
const SubCategory = require("../../app/model/SubCategory");
const Category = require("../../app/model/Category");
const { uploadToCloudinary } = require("../../services/v1/CloudinaryService");
const ApiError = require("../../utils/ApiError");
const Product = require("../../app/model/Product");

// Get SubCategory Service
const getSubCategory = async (filter, options) => {
  try {
    const getAllSubCate = await SubCategory.paginate({ ...filter }, options);
    return {
      data: getAllSubCate,
    };
  } catch (error) {
    throw error;
  }
};

// Get SubCategory Detail
const getSubCategoryDetail = async (id) => {
  try {
    const subCategory = await SubCategory.findOne({
      _id: new ObjectId(id),
    });
    return {
      data: subCategory,
    };
  } catch (error) {
    throw error;
  }
};

// Get SubCategory By category
const getAllSubCategoryForCategory = async (categoryId) => {
  try {
    const allSubCategory = await SubCategory.find({
      category: new ObjectId(categoryId),
    }).populate("category", ["name"]);

    return {
      data: allSubCategory,
    };
  } catch (error) {
    throw error;
  }
};

// Add SubCategory Service
const createSubCategory = async (name, category, filename) => {
  try {
    const checkSubCate = await SubCategory.findOne({ name: name });
    if (checkSubCate) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Danh mục đã tồn tại");
    }

    const newSubCategory = await SubCategory.create({
      name,
      image: filename,
      category,
    });

    if (newSubCategory) {
      // Add subcategory to category
      if (category) {
        await Category.findOneAndUpdate(
          { _id: category }, // Điều kiện tìm kiếm
          { $push: { subCategory: newSubCategory._id } }, // Toán tử $push để cập nhật mảng
          { new: true }
        );
      }
    }
    return {
      data: newSubCategory,
    };
  } catch (error) {
    throw error;
  }
};

// Update SubCategory Service
const updateSubCategory = async (id, data, filename) => {
  try {
    const checkSubCatId = await SubCategory.findOne({ _id: new ObjectId(id) });
    if (!checkSubCatId) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Sub category not found");
    }

    const updateSubCategory = await SubCategory.findOneAndUpdate(
      { _id: id },
      { ...data, image: filename },
      { new: true }
    );

    return {
      data: updateSubCategory,
    };
  } catch (error) {
    throw error;
  }
};

// Delete SubCategory
const deleteSubCategory = async (id) => {
  try {
    const checkSubCate = await SubCategory.findOne({
      _id: id,
    });
    if (!checkSubCate) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Sub category not found");
    }

    const checkProduct = await Product.findOne({
      subCategory: id,
    });
    if (checkProduct) {
      throw new ApiError(StatusCodes.CONFLICT, "Danh mục này không thể xóa");
    }

    await Category.updateMany(
      { subCategory: id },
      { $pull: { subCategory: id } }
    );
    await SubCategory.findByIdAndDelete({ _id: id });

    return {
      message: "Delete Success",
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getSubCategory,
  getSubCategoryDetail,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllSubCategoryForCategory,
};
