const Product = require("../models/product");

const getProducts = async (category, page = 1, itemsPerPage = 3) => {
  // create a container for filter
  let filter = {};
  if (category) {
    filter.category = category;
  }
  // apply the filters
  return await Product.find(filter)
    .limit(itemsPerPage)
    .skip((page - 1) * itemsPerPage)
    .sort({ _id: -1 });
};

const getProduct = async (id) => {
  return await Product.findById(id);
};

const addProduct = async (name, description, price, category) => {
  // create new product
  const newProduct = new Product({
    name,
    description,
    price,
    category,
  });
  // save into mongodb
  await newProduct.save();
  return newProduct;
};

const updateProduct = async (id, name, description, price, category) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
      category,
    },
    {
      new: true,
    }
  );
  return updatedProduct;
};

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
