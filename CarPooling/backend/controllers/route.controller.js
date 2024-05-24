const routeModel = require("../models/route.model");

class RouteControllers {
  isAdmin(req, res, next) { }

  //Only admin has the access
  async saveRoute(req, res) {
    
    try{
      const newRoute = routeModel.create(req.body);
    }
      
  }
  async editRoute(req, res) { }

  async deleteRoute(req, res) { }


  //Anyone can access
  async getRoute(req, res) { }

  async getRouteById(req, res) { }


}
module.exports = new RouteControllers();
