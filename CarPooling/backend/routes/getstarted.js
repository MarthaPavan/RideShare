const verifyToken = require("../middlewares/token.verification");
const loginController = require("../controllers/login.controller");
const routeController = require("../controllers/route.controller");
const existingUser = require("../middlewares/existinguser")
const verifyEmployee = require("../middlewares/nodemailer");
const express = require("express");
const route = express.Router();


route.post("/login", loginController.userLogin);
route.post("/signup", loginController.userRegister);


route.post("/route",verifyToken, routeController.saveRoute);
route.get("/route",verifyToken, routeController.getRoute);
route.get("/route/:id",verifyToken, routeController.getRouteById);
route.patch("/route/:routeId",verifyToken, routeController.editRoute);
route.delete("/route/:routeId",verifyToken, routeController.deleteRoute);
route.get("/nodemailer", verifyEmployee);
module.exports = route;