const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/user");

router.get("/allusers", auth.authentication, userController.getAllUser);

router.post("/register", userController.register);

router.post("/login", userController.login);

router.delete("/delete/:id", auth.authentication, userController.deleteUser);

router.post("/tokenIsValid", userController.userTokenvalid);

module.exports = router;
