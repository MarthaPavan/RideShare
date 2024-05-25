
const express = require("express")
const route = express.Router()




route.post("/route", routeController.saveRoute);
route.get("/route", routeController.getRoute);
route.get("/route/:id", routeController.getRouteById);
route.patch("/route/:routeId", routeController.editRoute);
route.delete("/route/:routeId", routeController.deleteRoute);


module.exports = route