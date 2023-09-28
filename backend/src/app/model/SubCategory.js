const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');

const SubCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    slug: 'name',
    unique: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
},{
    timestamps: true,
});
mongoose.plugin(slug);
const SubCategory = mongoose.model('SubCategory', SubCategorySchema);

module.exports = SubCategory;