const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const dbConnection = async () => {
  try {
    URI = process.env.MONGODB_URI;
    await mongoose.connect(URI);
    console.log("DataBase connected successfully");
  } catch (err) {
    console.log(`error in database connection err ${err}`);
  }
};

dbConnection();

app.use("/users", require("./routers/userRoutes"));

app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(5000, () => {
  console.log(`server running on the localhost 5000`);
});
