const express = require("express");

const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRouter = require("./routes/productRouter");

dotenv.config();

connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("Api is runing");
});

app.use("/api/products", productRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server is running on ${PORT}`));
