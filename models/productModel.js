const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Please enter product name"],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
    },
    category: {
      type: String,
      default: "General",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
