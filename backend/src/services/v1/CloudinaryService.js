const cloudinary = require('../../configs/cloundinaryConfig')
          


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

const uploadFileBuffer = async (croppedImageBuffer) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
          if (error) {
            console.error('Error uploading to Cloudinary:', error);
            reject(error); // Reject promise with error
          } else {
            resolve({ url: result.secure_url, publicId: result.public_id }); // Resolve promise with result
          }
        }
      );
  
      uploadStream.end(croppedImageBuffer);
    });
  };
module.exports = { uploadToCloudinary, deleteAnCloudinary, uploadFileBuffer }