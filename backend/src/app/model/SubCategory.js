const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubcategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category' // Reference to the Category model
  },
  product: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
  }]
},{
    timestamps: true,
});

const Subcategory = mongoose.model('Subcategory', SubcategorySchema);

module.exports = Subcategory;