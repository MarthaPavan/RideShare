const customerModel = require("../models/customer.model/customer.model");

class SignUpController {
  async saveCustomer(req, res) {
    try {
      const { customerid, customername, emailid, mobilenumber, status } =
        req.body;
      const customer = await customerModel.create({
        customerid: customerid,
        customername: customername,
        emailid: emailid,
        mobilenumber: mobilenumber,
        status: status,
      });
      console.log("Successfully inserted to customer collection");
      res.status(200).json(customer);
    } catch (err) {
      res.status(404).json({
        message: "Error in inserting document to customer collection",
      });
    }
  }
}
module.exports = new SignUpController();
