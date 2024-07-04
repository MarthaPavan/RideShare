const express = require("express");
const route = express.Router();
const routeController = require("../controllers/route.controller");
const { getDriver } = require("../controllers/driver.controller");
const verifyToken = require("../middlewares/token.verification");

// Route controllers
route.post("/saveRoute", verifyToken, routeController.saveRoute);
route.get("/getRoute", verifyToken, routeController.getRoute);
route.get("/getRoute/:routeId", verifyToken, routeController.getRouteById);
route.patch("/editRoute/:routeId", verifyToken, routeController.editRoute);
route.delete("/deleteRoute/:routeId", verifyToken, routeController.deleteRoute);
// Drivers
route.get("/getDriver", verifyToken, getDriver);
route.get('/driver-route/:email', routeController.getDriverRoute);
module.exports = route;
