const express = require("express");
const asynHandler = require("express-async-handler");
const { async } = require("rxjs");

const Product = require("../models/productModel");

const router = express.Router();

router.get(
  "/",
  asynHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
  })
);

router.get(
  "/:id",
  asynHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Error" });
    }
  })
);

module.exports = router;
