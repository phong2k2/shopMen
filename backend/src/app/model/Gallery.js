const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("../../plugins/paginate");

const GallerySchema = new Schema({
  image: {
    type: String,
    required: true,
    default: null,
  },
  productColor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductColor",
  },
});

GallerySchema.plugin(paginate);
const Gallery = mongoose.model("Gallery", GallerySchema);
module.exports = Gallery;
