//for verify this is correct user or not
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userModel = require("../models/userSchema.js");

const authentication = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    // console.log("token " + token);
    if (!token) {
      return res.status(400).json("not an authorized user");
    }
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log({ verified });
    if (!verified) {
      return res.json("verifyed" + false);
    }
    const user = await userModel.find({ email: verified.email });
    console.log("user" + user);
    if (!user) {
      return res.json("user" + false);
    }
    // return res.json(true);
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { authentication };
