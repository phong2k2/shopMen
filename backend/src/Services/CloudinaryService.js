const cloudinary = require('../configs/cloundinaryConfig')
          


const uploadToCloudinary = async (path, folder = 'images-shop_men/product') => {
    try {
        const data = await cloudinary.uploader.upload(path, { folder: folder, timeout:60000 });
        return { url: data.secure_url, publicId: data.public_id };
      } catch (err) {
        throw err;
      }
};

const deleteAnCloudinary = async (filename) => {
    try {
        await cloudinary.uploader.destroy(filename);
    }catch (error) {
        throw err
    }
}
module.exports = { uploadToCloudinary, deleteAnCloudinary }