const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GallerySchema = new Schema ({
    nameImage: {type: String},
    image: {
        publicId:{
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    productColor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductColor'
    }
})


const Gallery = mongoose.model('Gallery', GallerySchema)
module.exports = Gallery