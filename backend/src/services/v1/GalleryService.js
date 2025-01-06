const { StatusCodes } = require("http-status-codes")
const Gallery = require("../../app/model/Gallery")
const ProductColor = require("../../app/model/ProductColor")
const ApiError = require("../../utils/ApiError")

const getAllGalleries = async (filter, options) => {
  try {
    const allGallery = await Gallery.paginate({ ...filter }, options)
    return {
      data: allGallery
    }
  } catch (error) {
    throw error
  }
}

const getGalleryDetail = async (id) => {
  try {
    const imageProduct = await Gallery.findOne({
      _id: id
    })

    return {
      data: imageProduct
    }
  } catch (error) {
    throw error
  }
}

const createGallery = async (body, imgs) => {
  try {
    const newImageProduct = await Gallery.create({
      ...body,
      image: filename
    })

    // Add galleryId from productColor image list
    if (newImageProduct) {
      await ProductColor.findOneAndUpdate(
        { _id: newImageProduct.productColor }, // Điều kiện tìm kiếm
        { $push: { gallery: newImageProduct._id } }, // Toán tử $push để cập nhật mảng
        { new: true }
      )
    }

    return {
      data: newImageProduct
    }
  } catch (error) {
    throw error
  }
}

const updateGallery = async (id, body, fileData) => {
  try {
    const galleryProduct = await Gallery.findOne({
      _id: id
    })

    if (!galleryProduct) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Image not found")
    }

    const updateGalleryProduct = await Gallery.findOneAndUpdate(
      { _id: id },
      { ...body, image: fileData },
      { new: true }
    )

    return {
      data: updateGalleryProduct
    }
  } catch (error) {
    throw error
  }
}

const deleteGallery = async (id) => {
  try {
    const checkGallery = await Gallery.findOne({
      _id: id
    })
    if (!checkGallery) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Image not found")
    }
    // Delete gallery from productColor
    await ProductColor.updateMany({ gallery: id }, { $pull: { gallery: id } })

    await Gallery.findOneAndDelete({ _id: id })

    return {
      message: "Delete Successful"
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllGalleries,
  getGalleryDetail,
  createGallery,
  updateGallery,
  deleteGallery
}
