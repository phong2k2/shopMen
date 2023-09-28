const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');



const ProductSchema = new Schema({
    name: { type: String, required: true},
    price: { type: Number, required: true},
    discount: { type: Number , required: true},
    image: {type: String, required: true},
    countInStock: { type: Number, required: true},
    description: { type: String, required: true},
    hot: { type: Number, required: true},
    sold: { type: Number },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subCategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory'
    }
},{
    timestamps: true,
})

mongoose.plugin(slug);
const Product =  mongoose.model('Product',ProductSchema)
module.exports = Product