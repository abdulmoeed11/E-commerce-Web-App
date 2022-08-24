const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductbyId,
} = require("../controllers/productController");

router.get("/", getProducts);

router.get("/:id", getProductbyId);

module.exports = router;
