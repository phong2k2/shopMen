const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');



const ProductSchema = new Schema({
    name: { type: String},
    price: { type: Number},
    discount: { type: Number },
    image: {type: String},
    countInStock: { type: Number},
    description: { type: String},
    hot: { type: Number},
    sold: { type: Number },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
},{
    timestamps: true,
})

mongoose.plugin(slug);
const Product =  mongoose.model('Product',ProductSchema)
module.exports = Product