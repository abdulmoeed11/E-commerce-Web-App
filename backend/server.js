const express = require("express");

const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is runing");
});

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.use(notFound);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server is running on ${PORT}`));
