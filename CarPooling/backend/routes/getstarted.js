const verifyToken = require("../middlewares/token.verification");
const loginController = require("../controllers/login.controller");
const routeController = require("../controllers/route.controller");
const existingUser = require("../middlewares/existinguser");
const verifyEmployee = require("../middlewares/nodemailer");
const express = require("express");
const route = express.Router();

route.post("/login", loginController.userLogin);
route.post("/signup", loginController.userRegister);
route.put("/updateProfile", verifyToken, loginController.updateUserProfile); // New update profile route

module.exports = route;