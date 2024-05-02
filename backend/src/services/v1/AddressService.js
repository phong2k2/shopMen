const { StatusCodes } = require("http-status-codes");
const Address = require("../../app/model/Address.js");
const ApiError = require("../../utils/ApiError.js");

const getAllUserAddress = async (filter, options) => {
  try {
    const allAddress = await Address.paginate(filter, options);

    return {
      data: allAddress,
    };
  } catch (error) {
    throw error;
  }
};
const getAddressDetail = async (addressId) => {
  try {
    const addressDetail = await Address.findOne({ _id: addressId });

    console.log("🚀 ~ addressDetail:", addressDetail);

    return {
      data: addressDetail,
    };
  } catch (error) {
    throw error;
  }
};

const getAddressOrder = async (userId) => {
  try {
    const addressOrder = await Address.findOne({ userId: userId, status: 1 });

    return {
      data: addressOrder,
    };
  } catch (error) {
    throw error;
  }
};

const createAddress = async (address) => {
  try {
    const newAddress = await Address.create(address);

    return {
      data: newAddress,
    };
  } catch (error) {
    throw error;
  }
};

const updateAddress = async (addressId, newAddress) => {
  try {
    const checkAddress = Address.findOne({ _id: addressId });
    if (!checkAddress) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Address not found");
    }

    const addressData = await Address.findOneAndUpdate(
      { _id: addressId },
      newAddress,
      { new: true }
    );

    return {
      data: addressData,
    };
  } catch (error) {
    throw error;
  }
};

const updateStatusAddress = async (addressId, status) => {
  try {
    const checkAddress = Address.findOne({ _id: addressId });
    if (!checkAddress) {
      return resolve({
        status: "error",
        message: "Update không thành công",
      });
    }

    if (status === 0) {
      await Address.updateMany(
        { _id: { $ne: addressId } },
        { $set: { status: 0 } }
      );
    }

    const newObjectUpdate = await Address.findOneAndUpdate(
      { _id: addressId },
      { $set: { status: 1 } },
      { new: true }
    );

    return {
      data: newObjectUpdate,
    };
  } catch (error) {
    throw error;
  }
};

const deleteAddress = async (addressId) => {
  try {
    const checkAddress = Address.findOne({ _id: addressId });
    if (!checkAddress) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Address not found");
    }
    await Address.findOneAndDelete({ _id: addressId });

    return {
      message: "Delete Successfully",
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUserAddress,
  getAddressDetail,
  getAddressOrder,
  createAddress,
  updateAddress,
  updateStatusAddress,
  deleteAddress,
};
