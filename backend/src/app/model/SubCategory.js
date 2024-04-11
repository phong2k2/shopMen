const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");
const paginate = require("../../plugins/paginate");

const SubCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: null,
    },
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

SubCategorySchema.plugin(paginate);
mongoose.plugin(slug);
const SubCategory = mongoose.model("SubCategory", SubCategorySchema);

module.exports = SubCategory;
