const userModel = require("../models/users.model");
const bcryptjs = require("bcryptjs");

class LoginController {
  async userLogin(req, res) {
    try {
      const { userName, password } = req.body;
      const user = await userModel.findOne({ userName });
      console.log(req.body)
      if (user) {
        console.log(user)
        const compare = await bcryptjs.compare(password, user.password);
        console.log(compare)
        if (compare) {
          const token = "generated-jwt-token";
          return res.status(200).json({ status: "success", token: token });
        }
        return res.status(200).json({ status: "fail", msg: "Incorrect password" });
      }
      return res.status(200).json({ status: "fail", msg: "Incorrect username or password" });
    } catch (err) {
      res.status(500).json({ status: "error", msg: err.message });
    }
  }

  async userRegister(req, res) {
    req.employeeDetails = {};
    if (req.body.isEmployee) {
      req.employeeDetails = {
        vehicleModel: req.body.vehicleModel,
        vehicleNumber: req.body.vehicleNumber,
      };
    }
    try {
      const user = await userModel.findOne({
        $or: [
          { userName: req.body.userName },
          { emailId: req.body.emailId },
          { phoneNumber: req.body.phoneNumber },
        ],
      });

      if (user) return res.status(200).json({ status: "fail", msg: "User already exists" });

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(req.body.password, salt);

      const newUser = await userModel.create({
        userName: req.body.userName,
        emailId: req.body.emailId,
        phoneNumber: req.body.phoneNumber,
        password: hashedPassword,
        isEmployee: req.body.isEmployee,
        employeeDetails: req.employeeDetails,
      });
      return res.status(200).json({ status: "success", user: newUser });
    } catch (err) {
      res.status(500).json({ status: "error", msg: err.message });
    }
  }
}

module.exports = new LoginController();
