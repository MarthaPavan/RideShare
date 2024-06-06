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
      if (!user) {
        return res.status(401).json({ msg: "User not found" });
      }
      console.log(user)
      const compare = await bcryptjs.compare(password, user.password);
      if (compare) {
        const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: "24h" });
        return res.status(200).json({ role: user.role, token: token, user: user });
      } else {
        return res.status(401).json({ msg: "Incorrect emailId or password" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }

  async userRegister(req, res) {
    try {
      const { fullName, emailId, password, phoneNumber, role, registrationNumber, vehicleModel } = req.body;

      // Check if user already exists
      const existingUser = await userModel.findOne({ emailId });
      if (existingUser) {
        return res.status(400).json({ msg: "User already exists" });
      }

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      if(role=="driver"){
        const user = await userModel.create({
          fullName,
          emailId,
          phoneNumber,
          password: hashedPassword,
          role,
          registrationNumber,
          vehicleModel
        });
        return res.status(200).json({ msg: "success", user });
      }
      
        const user = await userModel.create({
          fullName,
          emailId,
          phoneNumber,
          password: hashedPassword,
          role
        });
        return res.status(200).json({ msg: "success", user });
      
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
}

module.exports = new LoginController();
