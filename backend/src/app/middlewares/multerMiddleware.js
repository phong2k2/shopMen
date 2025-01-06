const multer = require("multer")
const { StatusCodes } = require("http-status-codes")
const path = require("path")
const ApiError = require("../../utils/ApiError")

const uploadMiddleware = (req, res, next) => {
  const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    },
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../../uploads/images"))
    }
  })

  // const fileFilter = (req, file, cb) => {
  //   const fileTypes = /jpeg|jpg|png|gif/
  //   const mimeType = fileTypes.test(file.mimetype)
  //   const extname = fileTypes.test(path.extname(file.originalname))
  //   if (mimeType && extname) {
  //     return cb(null, true)
  //   }
  //   cb(
  //     new ApiError(
  //       StatusCodes.UNSUPPORTED_MEDIA_TYPE,
  //       "Hình ảnh không đúng định dạng"
  //     )
  //   )
  // }
  return multer({
    storage: storage,
    limits: { fileSize: 25 * 1024 * 1024 }
    // fileFilter: fileFilter
  })
}

// Xử lý hình ảnh hồ sơ của user

module.exports = {
  uploadMiddleware
}
