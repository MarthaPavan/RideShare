const loginController = require("../controllers/login.controller");
const express = require("express");
const route = express.Router();

route.post("/login", loginController.userLogin);
route.post("/signup", loginController.userRegister);




module.exports = route;
