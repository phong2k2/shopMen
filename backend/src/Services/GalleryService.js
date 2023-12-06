const {StatusCodes} = require('http-status-codes')
const Gallery = require('../app/model/Gallery')
const ProductColor = require('../app/model/ProductColor')
const {uploadToCloudinary, deleteAnCloudinary} = require('../Services/CloudinaryService');
const ApiError = require('../utils/ApiError')

const createGallery = async (body, fileData) => {
        let publicIdToDelete;
        try {
            // Upload image cloudinary
            const result = await uploadToCloudinary(fileData.path, 'images-shop_men/gallery');

            publicIdToDelete = result.publicId;
            
            const newImageProduct = await Gallery.create({
                ...body,
                image: result
            })
            // Add image from productColor image list
            if(newImageProduct) {
                await ProductColor.findOneAndUpdate(
                    { _id: newImageProduct.productColor }, // Điều kiện tìm kiếm
                    { $push: { gallery: newImageProduct._id } }, // Toán tử $push để cập nhật mảng
                    { new: true }
                );
            }
            
            return {
                data: newImageProduct
            }
        }catch (error) {
            if (publicIdToDelete) {
                await deleteAnCloudinary(publicIdToDelete);
            }
            throw error
        }
}

const getAllGalleriesForProduct = async (productId) => {
        try {
            
            const newGalleryProduct = await Gallery.find({
                productColor: productId
            });

            return {
                data: newGalleryProduct
            }
        }catch (error) {
            throw error
        }
}

const getGalleryDetail = async (id) => {
        try {
            const imageProduct = await Gallery.findOne({
                _id: id
            });
           
            return {
                data: imageProduct
            }
        }catch (error) {
            throw error
        }
}

const updateGallery = async (id, body, fileData) => {
        try {

            const galleryProduct = await Gallery.findOne({
                _id: id
            });

            if(fileData) {
                const result = await uploadToCloudinary(fileData.path);
                publicIdToDelete = result.publicId;
                if (result) body.image = result
            }

            if (!galleryProduct) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Image not found')
            }
    
            const updateGalleryProduct = await Gallery.findOneAndUpdate({_id: id}, body, {new: true})
            
            return {
                data: updateGalleryProduct
            }
        }catch (error) {
            throw error
        }
}

const deleteGallery = async (id, publicId) => {
        try {

            const checkGallery = await Gallery.findOne({
                _id: id
            });
            if (!checkGallery) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Image not found')
            }
            // Delete gallery from productColor
            await ProductColor.updateMany(
                { gallery: id },
                { $pull: { gallery: id } }
            );

            await Gallery.findOneAndDelete({_id: id})
            
            await deleteAnCloudinary(publicId);
           
            return {
                message: 'Delete Successful',
            }
        }catch (error) {
            throw error
        }
}

module.exports = {
    getAllGalleriesForProduct,
    getGalleryDetail,
    createGallery,
    updateGallery,
    deleteGallery  
}