const jwt = require("jsonwebtoken");
const userModel = require("../models/users.model");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY || "mysecretkey";

verifyToken = (req, res, next) => {

  const bearerHeader = req.headers['authorization'];
  //console.log(req.headers.authorization);
  const token = bearerHeader.split(' ')[1];

  // if token is undefined
  if (token == null)
  {
    return res.status(500).json({ msg: "Token is missing" });
  }


  jwt.verify(token, SECRET_KEY, async (err, verifiedToken) => {
    if (err)
    {
      return res.status(500).json({ msg: err.message });
    }
    else
    {
      //if token is verified successfully
      const user = await userModel.findOne({ emailId: verifiedToken.user.emailId });
      console.log(user);
      //if the user is admin
      if (user.role === "admin")
      {
        console.log("admin verified");
        next();
      }
      else {
        return res.status(500).json({ msg: "you are unauthorized" });
      }
      
    }
  });


}


module.exports = verifyToken;