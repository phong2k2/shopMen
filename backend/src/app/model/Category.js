const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');


const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    displayInSlider: {
        type: Number,
        default: 0
    },
},{
    timestamps: true,
})

mongoose.plugin(slug);

const Category =  mongoose.model('Category',CategorySchema)
module.exports = Category