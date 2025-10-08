const express = require("express");
//create a express router
const router = express.Router();

const { isAdmin } = require("../middleware/auth");

const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

// import the Product model
const Product = require("../models/product");
const { imageListItemClasses } = require("@mui/material");

// get all products
router.get("/", async (req, res) => {
  const category = req.query.category;
  const page = req.query.page;
  const products = await getProducts(category, page);
  res.status(200).send(products);
});

// GET /Products/:id - get a specific Product
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;

  const product = await getProduct(id);
  res.status(200).send(product);
});

// add new product
router.post("/", isAdmin, async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const image = req.body.image;

    // check error - make sure all the field are empty
    if (!name || !description || !price || !category) {
      return res.status(400).send({
        message: "All fields are required",
      });
    }

    // create new Product

    res
      .status(200)
      .send(await addProduct(name, description, price, category, image));
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

// PUT /Products/68941fa294f0b166942289e0 - update Product
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const image = req.body.image;

    // check error - make sure all the field are empty
    if (!name || !description || !price || !category) {
      return res.status(400).send({
        message: "All fields are required",
      });
    }

    res
      .status(200)
      .send(await updateProduct(id, name, description, price, category, image));
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

// DELETE /Products/68941fa294f0b166942289e0 - delete Product
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    await deleteProduct(id);
    res.status(200).send({
      message: `Product with the ID of ${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;
