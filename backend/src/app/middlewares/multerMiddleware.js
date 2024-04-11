const multer = require("multer");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const ApiError = require("../../utils/ApiError");

const uploadImageUserMiddleware = (() => {
  const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      console.log(
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  // Define file filter function
  const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb(
      new ApiError(
        StatusCodes.UNSUPPORTED_MEDIA_TYPE,
        "Hình ảnh không đúng định dạng"
      )
    );
  };

  return multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: fileFilter,
  }).single("image");
})();

const uploadMiddleware = (() => {
  const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
    destination: function (req, file, cb) {
      console.log(req.body);

      cb(null, path.join(__dirname, "../../uploads/images"));
    },
  });
  const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb(
      new ApiError(
        StatusCodes.UNSUPPORTED_MEDIA_TYPE,
        "Hình ảnh không đúng định dạng"
      )
    );
  };
  return multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: fileFilter,
  }).single("image");
})();

// Xử lý hình ảnh hồ sơ của user

module.exports = {
  uploadMiddleware,
  uploadImageUserMiddleware,
};
