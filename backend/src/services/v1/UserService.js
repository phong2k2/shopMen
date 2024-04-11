const { StatusCodes } = require("http-status-codes");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const User = require("../../app/model/User");
const ApiError = require("../../utils/ApiError");
const { uploadToCloudinary, uploadFileBuffer } = require("./CloudinaryService");

const getAllUser = async () => {
  try {
    const allUser = await User.find();

    return {
      data: allUser,
    };
  } catch (error) {
    throw error;
  }
};

const getDetailUser = async (userId) => {
  try {
    const user = await User.findOne({
      _id: userId,
    });
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }
    const { password, ...userDetail } = user._doc;

    return {
      data: userDetail,
    };
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, dataUpdate, fileData) => {
  try {
    const { y, x, width, height } = JSON.parse(dataUpdate.crop);
    const cropOptions = {
      top: y,
      left: x,
      width: width,
      height: height,
    };
    const checkUser = await User.findOne({
      _id: id,
    });

    if (!checkUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }

    // Crop Image
    if (fileData) {
      const croppedImageBuffer = await sharp(fileData.path)
        .extract(cropOptions)
        .toBuffer();

      const outputImagePath = path.join(
        __dirname,
        `../../uploads/images/${fileData.filename}`
      );

      await sharp(croppedImageBuffer).toFile(outputImagePath);

      dataUpdate.image = fileData.filename;
    }

    const updatedUser = await User.findByIdAndUpdate({ _id: id }, dataUpdate, {
      new: true,
    });
    const { password, ...other } = updatedUser._doc;

    return {
      data: other,
    };
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const checkDeleteUser = await User.findOne({ _id: id });
    if (!checkDeleteUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }
    await User.findOneAndDelete({ _id: id });

    return {
      message: "Delete Success",
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUser,
  deleteUser,
  getDetailUser,
  updateUser,
};
