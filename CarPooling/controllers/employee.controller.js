const employeeModel = require("../models/employee.model/employee.model");

class EmployeeController {
  async getEmployees(req, res) {
    try {
      const employee = await employeeModel.create(req.body);
      console.log("Inserted to employee collection");
      res.status(200).json(employee);
    } catch (err) {
      res.status(404).json({
        message: "Error in inserting document to employee collection",
      });
    }
  }
}

module.exports = new EmployeeController();
