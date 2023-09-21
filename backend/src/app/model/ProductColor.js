const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductColorSchema = new Schema ({
    color: {type: String},
    image: [String],
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
})


const ProductColor = mongoose.model('ProductColor', ProductColorSchema)
module.exports = ProductColor