const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSizeSchema = new Schema ({
    size: {
            type: String,
            required: true
        },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
})


const ProductSize = mongoose.model('ProductSize', ProductSizeSchema)
module.exports = ProductSize