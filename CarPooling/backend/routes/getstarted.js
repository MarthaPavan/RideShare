const loginController = require("../controllers/login.controller");
const routeController = require("../controllers/route.controller");
const existingUser = require("../middlewares/existinguser")
const verifyEmployee = require("../middlewares/nodemailer");
const express = require("express");
const route = express.Router();

route.post("/login", loginController.userLogin);
route.post("/signup", loginController.userRegister);


route.post("/route", routeController.saveRoute);
route.get("/route", routeController.getRoute);
route.get("/route/:id", routeController.getRouteById);
route.patch("/route/:routeId", routeController.editRoute);
route.delete("/route/:routeId", routeController.deleteRoute);
route.get("/nodemailer", verifyEmployee);
module.exports = route;
