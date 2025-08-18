const Product = require("../models/product");

async function getProducts(category, price) {
  // create a empty container for filter
  let filter = {};
  // if genre exists, then only add it into the filter container
  if (category) {
    filter.category = category;
  }
  // if rating exists, then only add it into the filter container
  if (price) {
    filter.price = { $lt: price };
  }
  // load the Products data from mongoDB
  const products = await Product.find(filter);
  return products;
}

async function getProduct(id) {
  // load the TVProduct data based on id
  const product = await Product.findById(id);
  return product;
}

async function addProduct(name, description, price, category) {
  const newProduct = new Product({
    name,
    description,
    price,
    category,
  });
  // save the new Product into MOngoDB
  await newProduct.save(); // clicking the "save" button
  return newProduct;
}

async function updateProduct(id, name, description, price, category) {
  return await Product.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
      category,
    },
    {
      new: true, // return the updated data
    }
  );
}

async function deleteProduct(id) {
  // delete the movie
  return await Product.findByIdAndDelete(id);
}

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
