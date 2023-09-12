const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');


// const ProductSchema = new Schema({
//     name: { type: String, require: true},
//     price: { type: Number, require: true},
//     discount: { type: Number, require: true },
//     image: { type: String, require: true},
//     countInStock: { type: Number, require: true},
//     description: { type: String, require: true},
//     hot: { type: Number, require: true},
//     category: { 
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Category'
//     }
// },{
//     timestamps: true,
// })
const ProductSchema = new Schema({
    name: { type: String},
    price: { type: Number},
    discount: { type: Number },
    image: { type: String},
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