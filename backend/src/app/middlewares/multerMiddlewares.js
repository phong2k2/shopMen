const multer = require('multer');
const { StatusCodes } = require('http-status-codes');
const path = require('path');
const ApiError = require('../../utils/ApiError');

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        // cb(null,file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0],); // Đặt tên cho tệp tin
        cb(null,file.originalname)
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // Giới hạn kích thước tệp tin
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        if (mimeType && extname) {
            return cb(null, true);
        }
        cb(new ApiError(StatusCodes.UNSUPPORTED_MEDIA_TYPE,'Hình ảnh không đúng định dạng'));
    },
}); // 'image' là tên của trường form-data chứa hình ảnh


// const uploadArray = multer({
//     storage: storage,
//     limits: { fileSize: 10000000 }, // Giới hạn kích thước tệp tin
//     fileFilter: (req, file, cb) => {
//         const fileTypes = /jpeg|jpg|png|gif/;
//         const mimeType = fileTypes.test(file.mimetype);
//         const extname = fileTypes.test(path.extname(file.originalname));

//         if (mimeType && extname) {
//             return cb(null, true);
//         }
//         cb('Give proper file format to upload');
//     },
// }); // 'image' là tên của trường form-data chứa hình ảnh

module.exports = upload

// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('../../configs/cloundinaryConfig');
// const multer = require('multer');

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'images-shopMen',
//         format: ["jpg", "png", "jpeg"],
//     }
// })

// const upload = multer({ storage: storage })
