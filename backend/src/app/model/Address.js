const mongoose = require("mongoose")
const Schema = mongoose.Schema
const paginate = require("../../plugins/paginate")

const AddressSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    province: {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    district: {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    ward: {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    address: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    status: {
      type: Number,
      default: 0
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
)

AddressSchema.plugin(paginate)
const Address = mongoose.model("Address", AddressSchema)
module.exports = Address
