const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const paginate = require('../../plugins/paginate');

const ProductColorSchema = new Schema ({
    nameColor: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    gallery: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Gallery'
        },
    ],
    size: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductSize'
        },
    ]
})

ProductColorSchema.plugin(paginate);
const ProductColor = mongoose.model('ProductColor', ProductColorSchema)
module.exports = ProductColor