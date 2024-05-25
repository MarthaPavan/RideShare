const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


const existingUsers = require("../middlewares/existinguser")
const userModel = require("../models/users.model");
// const driverModel = require("../models/drivers.model");
// const adminModel = require("../models/admin.model");




const SECRET_KEY = process.env.SECRET_KEY || "mysecretkey";
require("dotenv").config();


class LoginController {




  async userLogin(req, res) {

    const { emailId, password } = req.body;

    try {
      const user = await userModel.findOne({ emailId });
      
      const compare = await bcryptjs.compare(password, user.password);
      //console.log(password + " " + user.password);
      console.log(compare);

      if (compare) {
      
        const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: "24h" });

        console.log(token);

        return res.status(200).json({ role: user.role, token: token });
      }
      else
      {
        return res.status(500).json({ msg: "Incorrect emailId or password" }); 
      }

    }
    catch (err)
    {
      return res.status(500).json({ msg: err.message });
    }

  }


  async userRegister(req, res) {
    if (existingUsers.existingUser)
    {
      try
      {
         
        const { role } = req.body;
        //console.log(req.body);
      if (role === "admin")
      {
        console.log(req.body);

        const {fullName,emailId,password,phoneNumber} = req.body;
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);


        const admin = await userModel.create({
          fullName: fullName,
          emailId: emailId,
          phoneNumber: phoneNumber,
          password: hashedPassword,
          role:role
        });


        return  res.status(200).json({ msg: "success", admin: admin });
        
      
      }
      else if (role === "user")
      {
          console.log(req.body);

        const { fullName, emailId, phoneNumber, password } = req.body;

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        const user =await userModel.create({
          fullName: fullName,
          emailId: emailId,
          phoneNumber: phoneNumber,
          password: hashedPassword,
          role:role
        });
        return res.status(200).json({ msg: "success", user:user });

      }
      else
      {
        const {fullName,emailId,password,phoneNumber,registrationNumber,vehicleModel,isVerified} = req.body;
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        const driver = await userModel.create({
          fullName: fullName,
          emailId: emailId,
          phoneNumber: phoneNumber,
          password: hashedPassword,
          role: role,
          registrationNumber: registrationNumber,
          vehicleModel: vehicleModel,
          isVerified:isVerified
        });

        return res.status(200).json({ msg: "success", driver:driver });


      }


    }
    catch (err) {
      return res.status(500).json({ msg: err.message });
    }
    }
  }
}


module.exports = new LoginController()