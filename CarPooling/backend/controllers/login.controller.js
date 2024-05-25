const userModel = require("../models/users.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { driverSchema, driverModel } = require("../models/drivers.model");
// const verifyToken = require("../TokenVerification/token.verification");
const SECRET_KEY = process.env.SECRET_KEY || "mysecretkey";
require("dotenv").config();
class LoginController {
  // Middleware function to verify JWT token
  async userLogin(req, res) {
    try {
      const { userName, password } = req.body;
      const user = await userModel.findOne({ userName });
      console.log(req.body,user)
      if (user) {
        console.log(user);
        // Generate JWT
        const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: "24h" });
        console.log(token);
        const compare = await bcryptjs.compare(password, user.password);
        console.log(compare);
        if (compare) {
          return res.status(200).json({ status: "success", token: token });
        }
        return res
          .status(200)
          .json({ status: "fail", msg: "Incorrect password" });
      }
      return res
        .status(200)
        .json({ status: "fail", msg: "Incorrect username or password" });
    } catch (err) {
      res.status(500).json({ status: "error", msg: err.message });
    }
  }

  async userRegister(req, res) {
    req.employeeDetails = {};
    console.log(req.body);
    if (req.body.isEmployee) {
      console.log(req.body);
      const { registrationNumber } = req.body;
      console.log(registrationNumber);
      const valid = await userModel.findOne({
        "employeeDetails.registrationNumber": registrationNumber,
      });

      if (valid) {
        console.log("vehicle number already exists with other user");
        return res
          .status(200)
          .json({ msg: "vehicle number already exists with other user" });
      }
      req.employeeDetails = {
        vehicleModel: req.body.vehicleModel,
        registrationNumber: req.body.registrationNumber,
      };
      const driver = await driverModel.create({
        driverName: req.body.userName,
        phoneNumber: req.body.phoneNumber,
        emailId: req.body.emailId,
        registrationNumber: req.employeeDetails.registrationNumber,
        vehicleModel: req.employeeDetails.vehicleModel,
      });
      console.log(driver);
    }
    try {
      const user = await userModel.findOne({
        $or: [
          { userName: req.body.userName },
          { emailId: req.body.emailId },
          { phoneNumber: req.body.phoneNumber },
        ],
      });

      if (user)
        return res
          .status(200)
          .json({ status: "fail", msg: "User already exists" });

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
