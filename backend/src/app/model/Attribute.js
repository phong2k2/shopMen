const mongoose = require("mongoose")
const Schema = mongoose.Schema
const paginate = require("../../plugins/paginate")

const AttributeSchema = new Schema(
  {
    name: { type: String, required: true },
    images: [{ type: String, default: null }],
    thumbnail: {
      type: String,
      default: null
    },
    attributeType: {
      type: Schema.Types.ObjectId,
      ref: "AttributeType",
      required: true
    }
  },
  {
    timestamps: true
  }
)

AttributeSchema.plugin(paginate)
const Attribute = mongoose.model("Attribute", AttributeSchema)
module.exports = Attribute
