const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users.model");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "mysecretkey";

class LoginController {
  async userLogin(req, res) {
    const { emailId, password } = req.body;

    try {
      const user = await userModel.findOne({ emailId });
      // console.log(user);
      if (!user) {
        return res.status(401).json({ msg: "Account doesn't exist.Register" });
      }
      console.log(user);
      const compare = await bcryptjs.compare(password, user.password);
      if (compare) {
        const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: "24h" });
        return res
          .status(200)
          .json({ role: user.role, token: token, user: user });
      } else {
        return res.status(401).json({ msg: "Incorrect emailId or password" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }

  async userRegister(req, res) {
    try {
      const { emailId, password, role, fullName, phoneNumber, registrationNumber, vehicleModel } = req.body;
      
      const existingUser = await userModel.findOne({ emailId });
      if (existingUser) {
        return res.status(400).json({ msg: "User already exists" });
      }
      console.log(req.body);
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const newUser = {
        fullName,
        emailId,
        phoneNumber,
        password: hashedPassword,
        role
      };

      if (role === "driver") {
        newUser.registrationNumber = registrationNumber;
        newUser.vehicleModel = vehicleModel;
      }

      const user = await userModel.create(newUser);
      return res.status(200).json({ msg: "success", user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
}

module.exports = new LoginController();
