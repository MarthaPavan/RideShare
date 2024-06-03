const express = require("express");
const route = express.Router();
const routeController = require("../controllers/route.controller");
route.post("/saveRoute", routeController.saveRoute);
route.get("/getRoute", routeController.getRoute);
route.get("/getRoute/:routeId", routeController.getRouteById);
route.patch("/editRoute/:routeId", routeController.editRoute);
route.delete("/deleteRoute/:routeId", routeController.deleteRoute);

module.exports = route;
