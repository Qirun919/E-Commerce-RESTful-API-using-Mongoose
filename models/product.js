const { Schema, model } = require("mongoose");

// declare schema for product
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  // linkage between the products and categories (similar to SQL foreign key)
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  image: {
    type: String,
  },
});

// create a Modal from the schema
const Product = model("Product", productSchema);

// export the Modal
module.exports = Product;
