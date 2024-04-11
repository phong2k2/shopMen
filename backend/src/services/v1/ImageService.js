const cloudinary = require('../../configs/cloundinaryConfig');

const uploadImages = (images) => {
    return new Promise (async (resolve, reject) => {
        try {
            const uploadedImages = []
            for(let image of images) {
                const result = await cloudinary.uploader.upload(image)
                uploadedImages.push({
                    url: result.secure_url,
                    publicId: result.public_id,
                })
            }
            console.log(uploadedImages)

            return resolve({
                message: 'Successful request',
                data: uploadedImages
            })
        }catch(error) {
            reject(error)
        }

    })
}

module.exports = {
    uploadImages
}