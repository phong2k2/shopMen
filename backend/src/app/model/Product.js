const mongoose = require("mongoose")
const Schema = mongoose.Schema
const slug = require("mongoose-slug-updater")
const paginate = require("../../plugins/paginate")

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, default: null },
    salePrice: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    description: { type: String, required: true },
    hot: { type: String, required: true, enums: ["hot", "normal"] },
    sold: { type: Number },
    thumbnail: { type: String, required: true },
    slug: {
      type: String,
      slug: "name",
      unique: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category"
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory"
    },
    color: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProductColor"
      }
    ],
    size: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductSize"
      }
    ]
  },
  {
    timestamps: true
  }
)

ProductSchema.plugin(paginate)
mongoose.plugin(slug)

const Product = mongoose.model("Product", ProductSchema)
module.exports = Product
