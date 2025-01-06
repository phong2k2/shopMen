const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AttributeTypeSchema = new Schema(
  {
    name: { type: String, required: true },
    description: {
      type: String
    },
    attribute: [
      {
        type: Schema.Types.ObjectId,
        ref: "Attribute"
      }
    ]
  },
  {
    timestamps: true
  }
)
const AttributeType = mongoose.model("AttributeType", AttributeTypeSchema)
module.exports = AttributeType
