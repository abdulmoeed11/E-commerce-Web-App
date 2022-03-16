const express = require("express");

const products = require("./data/products");

const app = express();

app.get("/", (req, res) => {
  res.send("Api is runing");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => req.params.id == p._id);
  res.json(product);
});

app.listen(5000, console.log("server is running"));
