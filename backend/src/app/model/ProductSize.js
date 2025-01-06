const mongoose = require("mongoose")
const Schema = mongoose.Schema
const paginate = require("../../plugins/paginate")

const ProductSizeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    }
  ]
})

ProductSizeSchema.plugin(paginate)
const ProductSize = mongoose.model("ProductSize", ProductSizeSchema)
module.exports = ProductSize
