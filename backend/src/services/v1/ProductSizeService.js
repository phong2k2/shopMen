const { StatusCodes } = require("http-status-codes")
const Product = require("../../app/model/Product")
const ProductSize = require("../../app/model/ProductSize")
const ApiError = require("../../utils/ApiError")

const createSize = async (valueSize) => {
  try {
    const { name, product } = valueSize

    let size = await ProductSize.findOne({
      name
    })

    if (size) {
      if (size.product.includes(product)) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Size not found")
      }
      size.product.push(product)
      await size.save()
    } else {
      size = await ProductSize.create(valueSize)
    }

    if (size && product) {
      const result = await Product.findOneAndUpdate(
        { _id: product },
        { $push: { size: size._id } },
        { new: true }
      )
    }
    return {
      data: size
    }
  } catch (error) {
    throw error
  }
}

// get Product Color
const getAllSizes = async (filter, options) => {
  try {
    const allColor = await ProductSize.paginate({ ...filter }, options)

    return {
      data: allColor
    }
  } catch (error) {
    throw error
  }
}

const getSizeDetail = async (id) => {
  try {
    const sizeDetails = await ProductSize.findOne({
      _id: id
    })
    if (!sizeDetails) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Size not found")
    }

    return {
      data: sizeDetails
    }
  } catch (error) {
    throw error
  }
}

const updateSize = async (id, newSize) => {
  try {
    const checkSize = await ProductSize.findOne({ _id: id })

    if (!checkSize) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Size not found")
    }
    const updateSize = await ProductSize.findOneAndUpdate(
      { _id: id },
      newSize,
      { new: true }
    )

    return {
      data: updateSize
    }
  } catch (error) {
    throw error
  }
}

const deleteSize = async (id) => {
  try {
    const checkColor = await ProductSize.findOne({ _id: id })
    if (!checkColor) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Size not found")
    }
    // Delete size from color

    await ProductSize.findOneAndDelete({ _id: id })

    await Product.updateMany({ size: id }, { $pull: { size: id } })

    return {
      message: "Delete Successful"
    }
  } catch (error) {
    throw error
  }
}
module.exports = {
  createSize,
  getAllSizes,
  getSizeDetail,
  updateSize,
  deleteSize
}
