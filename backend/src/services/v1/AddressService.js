const { StatusCodes } = require("http-status-codes")
const Address = require("../../app/model/Address.js")
const ApiError = require("../../utils/ApiError.js")

const getAllUserAddress = async (filter, options) => {
  try {
    const allAddress = await Address.paginate(filter, options)

    return {
      data: allAddress
    }
  } catch (error) {
    throw error
  }
}
const getAddressDetail = async (addressId) => {
  try {
    const addressDetail = await Address.findOne({ _id: addressId })

    return {
      data: addressDetail
    }
  } catch (error) {
    throw error
  }
}

const getAddressOrder = async (userId) => {
  try {
    const addressOrder = await Address.findOne({ userId: userId, status: 1 })

    return {
      data: addressOrder
    }
  } catch (error) {
    throw error
  }
}

const createAddress = async (dataAddress) => {
  try {
    if (dataAddress.status === 1) {
      const addressOrder = await Address.findOne({
        userId: dataAddress.userId,
        status: 1
      })
      if (addressOrder) {
        addressOrder.status = 0
        await addressOrder.save()
      }
    }
    const newAddress = await Address.create(dataAddress)

    return {
      data: newAddress
    }
  } catch (error) {
    throw error
  }
}

const updateAddress = async (addressId, newAddress) => {
  try {
    const addressOld = await Address.findOne({ _id: addressId })

    if (!addressOld)
      throw new ApiError(StatusCodes.NOT_FOUND, "Address not found")

    const addressData = await Address.findOneAndUpdate(
      { _id: addressId },
      newAddress,
      { new: true }
    )

    return {
      data: addressData
    }
  } catch (error) {
    throw error
  }
}

const deleteAddress = async (addressId) => {
  try {
    const checkAddress = Address.findOne({ _id: addressId })
    if (!checkAddress) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Address not found")
    }
    await Address.findOneAndDelete({ _id: addressId })

    return {
      message: "Delete Successfully"
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllUserAddress,
  getAddressDetail,
  getAddressOrder,
  createAddress,
  updateAddress,
  deleteAddress
}
