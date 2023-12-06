const {ObjectId} = require('mongodb');
const {StatusCodes} = require('http-status-codes');
const ProductColor = require('../app/model/ProductColor')
const ProductSize = require('../app/model/ProductSize')

const createSize = async (valueSize) => {
        try {
            const {size, productColor} = valueSize
            const checkSize = await ProductSize.findOne(
                {
                    size,
                    productColor,
                }
            );
            if(checkSize) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Size not found')
            }
            
            const newSize = await ProductSize.create(valueSize)

            // Add image from productColor image list
            if(newSize) {
                await ProductColor.findOneAndUpdate(
                    { _id: newSize.productColor }, // Điều kiện tìm kiếm
                    { $push: { size: newSize._id } }, // Toán tử $push để cập nhật mảng
                    { new: true }
                );
            }
            return {
                data: newSize
            }
        }catch(error) {
            throw error
        }
}

// get Product Color
const getAllSizesForProduct = async (productId) => {
        try {
            const allColor = await ProductSize.find({
                productColor: productId
            })
            
            return {
                data: allColor
            }
        }catch(error) {
            throw error
        }
}

const getSizeDetail = async (id) => {
        try {
            const sizeDetails = await ProductSize.findOne({
                _id: new ObjectId(id) 
            })
            if(!sizeDetails) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Size not found')
            }
            
            return {
                data: sizeDetails
            }
        }catch(error) {
            throw error
        }
}

const updateSize = async (id, newSize) => {
        try {

            const checkSize = await ProductSize.findOne({_id: new ObjectId(id)});

            if(!checkSize) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Size not found')
            }
            const updateSize = await ProductSize.findOneAndUpdate({_id:  new ObjectId(id)}, newSize, {new: true})
            
            return {
                data: updateSize
            }
        }catch (error) {
            throw error
        }
}

const deleteSize = async (id) => {
        try {
            const checkColor = await ProductSize.findOne({_id: new ObjectId(id)});
            if(!checkColor) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Size not found')
            }
            // Delete size from color
            
            await ProductSize.findOneAndDelete({_id: new ObjectId(id)});

            await ProductColor.updateMany(
                { size: new ObjectId(id)},
                { $pull: { size: new ObjectId(id) } }
            );

            return {
                message: 'Delete Successful',
            }
        }catch (error) {
            throw error
        }
}
module.exports = {
    createSize,
    getAllSizesForProduct,
    getSizeDetail,
    updateSize,
    deleteSize
}