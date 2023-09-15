const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/images'); // Thư mục lưu trữ tệp tin tải lên
    },
    filename: function (req, file, cb) {
        cb(null,file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0],); // Đặt tên cho tệp tin
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
        cb('Give proper file format to upload');
    },
}).array('images', 12); // 'image' là tên của trường form-data chứa hình ảnh

module.exports = upload;