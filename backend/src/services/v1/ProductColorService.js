const { ObjectId } = require("mongodb")
const { StatusCodes } = require("http-status-codes")
const ProductColor = require("../../app/model/ProductColor")
const ApiError = require("../../utils/ApiError")
const Product = require("../../app/model/Product")

const createColor = async (data, images) => {
  const { name, product } = data
  try {
    const checkColor = await ProductColor.findOne({
      name,
      product
    })

    if (checkColor) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Color not found")
    }

    const newColor = await ProductColor.create({ ...data, images })

    if (newColor) {
      await Product.findOneAndUpdate(
        { _id: newColor.product }, // Điều kiện tìm kiếm
        { $push: { color: newColor._id } }, // Toán tử $push để cập nhật mảng
        { new: true }
      )
    }

    return {
      data: newColor
    }
  } catch (error) {
    throw error
  }
}

// get Product Color
const getColorForProduct = async (filter, options) => {
  try {
    const allColor = await ProductColor.paginate({ ...filter }, options)
    return {
      data: allColor
    }
  } catch (error) {
    throw error
  }
}

const getColorDetail = async (id) => {
  try {
    const colorDetails = await ProductColor.findOne({
      _id: id
    })
    if (!colorDetails) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Color not found")
    }

    return {
      data: colorDetails
    }
  } catch (error) {
    throw error
  }
}

// Update color
const updateColor = async (id, newColor) => {
  const { name } = newColor
  try {
    const checkColor = await ProductColor.findOne({ _id: id })
    const existColor = await ProductColor.findOne({
      name
    })
    if (!checkColor || existColor) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Color not found")
    }

    const updateColor = await ProductColor.findOneAndUpdate(
      { _id: id },
      newColor,
      { new: true }
    )

    return {
      data: updateColor
    }
  } catch (error) {
    throw error
  }
}

const deleteColor = async (id) => {
  try {
    const checkColor = await ProductColor.findOne({ _id: id })
    if (!checkColor) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Color not found")
    }
    await ProductColor.findOneAndDelete({ _id: id })

    await Product.updateMany({ color: new id() }, { $pull: { color: id } })

    return {
      message: "Delete Successful"
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  getColorForProduct,
  getColorDetail,
  createColor,
  updateColor,
  deleteColor
}
