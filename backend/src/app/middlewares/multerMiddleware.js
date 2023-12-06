const multer = require('multer');

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../configs/cloundinaryConfig');

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ["jpg", "png", "jpeg"],
    params: {
        folder: 'images-shop_men',
    }
})

const upload = multer({ storage: storage })

module.exports = upload