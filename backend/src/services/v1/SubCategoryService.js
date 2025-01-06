const { StatusCodes } = require("http-status-codes")
const SubCategory = require("../../app/model/SubCategory")
const Category = require("../../app/model/Category")
const ApiError = require("../../utils/ApiError")
const Product = require("../../app/model/Product")

const getAllSubCategory = async (filter, options) => {
  try {
    const getAllSubCate = await SubCategory.paginate({ ...filter }, options)
    return {
      data: getAllSubCate
    }
  } catch (error) {
    throw error
  }
}

const getSubCategoryDetail = async (id) => {
  try {
    const subCategory = await SubCategory.findOne({
      _id: id
    })
    return {
      data: subCategory
    }
  } catch (error) {
    throw error
  }
}

const createSubCategory = async (name, category, filename) => {
  try {
    const checkSubCate = await SubCategory.findOne({ name: name })
    if (checkSubCate) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Danh mục đã tồn tại")
    }

    const newSubCategory = await SubCategory.create({
      name,
      image: filename,
      category
    })

    if (newSubCategory) {
      if (category) {
        await Category.findOneAndUpdate(
          { _id: category },
          { $push: { subCategory: newSubCategory._id } },
          { new: true }
        )
      }
    }
    return {
      data: newSubCategory
    }
  } catch (error) {
    throw error
  }
}

const updateSubCategory = async (id, data, filename) => {
  try {
    const checkSubCatId = await SubCategory.findOne({ _id: id })
    if (!checkSubCatId) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Sub category not found")
    }

    const updateSubCategory = await SubCategory.findOneAndUpdate(
      { _id: id },
      { ...data, image: filename },
      { new: true }
    )

    return {
      data: updateSubCategory
    }
  } catch (error) {
    throw error
  }
}

const deleteSubCategory = async (id) => {
  try {
    const checkSubCate = await SubCategory.findOne({
      _id: id
    })
    if (!checkSubCate) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Sub category not found")
    }

    const checkProduct = await Product.findOne({
      subCategory: id
    })
    if (checkProduct) {
      throw new ApiError(StatusCodes.CONFLICT, "Danh mục này không thể xóa")
    }

    await Category.updateMany(
      { subCategory: id },
      { $pull: { subCategory: id } }
    )
    await SubCategory.findByIdAndDelete({ _id: id })

    return {
      message: "Delete Success"
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllSubCategory,
  getSubCategoryDetail,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory
}
