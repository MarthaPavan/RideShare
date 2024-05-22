const userModel = require("../models/users.model");
const bcryptjs = require("bcryptjs");

class LoginController {
  async userLogin(req, res) {
    try {
      const { userName, password } = req.body;
      const user = await userModel.findOne({ userName });
      if (user) {
        const compare = await bcryptjs.compare(password, user.password);
        if (compare) {
          return res.status(200).json({ msg: "Logged in successfully" });
        }
        return res.status(200).json({ msg: "Incorrect password" });
      }
      return res.status(200).json({ msg: "Incorrect username or password" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
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
      //Query to check if the registering user already exists
      const user = await userModel.findOne({
        $or: [
          { userName: req.body.userName },
          { emailId: req.body.emailId },
          { phoneNumber: req.body.phoneNumber },
        ],
      });

      if (user) return res.status(200).json({ msg: "User already exists" });

      //If user does not exists Hash the password and register the user into database
      //Hashing
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
      return res.json(newUser);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
}

module.exports = new LoginController();
