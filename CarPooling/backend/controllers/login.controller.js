const customerModel = require("../models/customer.model");

class LoginController {
  async saveCustomer(req, res) {
    try {
      const customer = {
        customerid: req.body.customerid,
        customername: req.body.customername,
        emailid: req.body.emailid,
        mobilenumber: req.body.mobilenumber,
      };
      const cust = customerModel.create(customer);
      res.status(200).json({ msg: "Inserted sucessfully" });
    } catch (err) {
      res.status(500).json({ msg: "failed to create customer " + err.message });
    }
  }
}

module.exports = new LoginController();
