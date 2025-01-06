const mongoose = require("mongoose")
const Schema = mongoose.Schema
const paginate = require("../../plugins/paginate")

const ProductColorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  images: [{ type: String, default: null }],
  thumbnail: {
    type: String,
    required: true
  },
  size: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductSize"
    }
  ]
})

ProductColorSchema.plugin(paginate)
const ProductColor = mongoose.model("ProductColor", ProductColorSchema)
module.exports = ProductColor
