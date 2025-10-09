// load the enviroment variables
require("dotenv").config();

const express = require("express");
// import mongoose
const mongoose = require("mongoose");
const cors = require("cors");

// setup an express app
const app = express();

//setup cors policy
app.use(cors());

// setup a middleware to handle JSON request
app.use(express.json());

// connect to MongoDB using Mongoose
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL + "/Ecommerce");
    console.log("MongoDB is Connected");
  } catch (error) {
    console.log(error);
  }
}

// trigger the connection with MongoDB
connectToMongoDB();

// setup root route
app.get("/api", (req, res) => {
  res.send("Happy coding!");
});

// import all the routers
// long method
const productRouter = require("./routes/product");
app.use("/api/products", productRouter);

// short form
app.use("/api/orders", require("./routes/order"));

app.use("/api/payment", require("./routes/payment"));

app.use("/api/image", require("./routes/image"));

app.use("/api/categories", require("./routes/category"));

app.use("/api/users", require("./routes/user"));

// set afolder as a static path
app.use("/api/uploads", express.static("uploads"));

// start the express server
app.listen(5919, () => {
  console.log("server is running at http://localhost:5919");
});
