const asynHandler = require("express-async-handler");
const Product = require("../models/productModel");

const getProducts = asynHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

const getProductbyId = asynHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // console.log(product);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = { getProducts, getProductbyId };
