const userModel = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const getAllUser = async (req, res) => {
  try {
    const allUser = await userModel.find({});
    res.status(200).send(allUser);
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: "read user " + error });
  }
};

const register = async (req, res) => {
  const { user, email, password } = req.body;
  // console.log(req.body);
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      user,
      email,
      password: hashedPassword,
    });
    // console.log(salt);  sdfasdfasdfadfadsf <- salt
    // console.log(hashedPassword); sdfasdfasdfadfadsf + zsdfsdffdDfDFSD <- password
    await newUser.save();
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(400).send("register" + error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await userModel.findOne({ email: email });
    if (!userData) {
      return res
        .status(400)
        .json({ status: 400, massage: "user is not found" });
    }
    // console.log(bcrypt.compare(password, userData.password));

    if (await bcrypt.compare(password, userData.password)) {
      const token = jwt.sign(
        { id: userData._id, user: userData.user, email: userData.email },
        process.env.ACCESS_TOKEN_SECRET
      );
      return res.json(token);
    } else {
      return res.status(400).send("not an user");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const userTokenvalid = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    // console.log("token " + token);
    if (!token) {
      return res.json("token not found" + false);
    }
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log({ verified });
    if (!verified) {
      return res.json("not varified user " + false);
    }
    const user = await userModel.find({ email: verified.email });
    // console.log("user" + user);
    if (!user) {
      return res.json("user is not found" + false);
    }
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUser,
  register,
  login,
  deleteUser,
  userTokenvalid,
};
