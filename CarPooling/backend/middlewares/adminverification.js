const jwt = require("jsonwebtoken");
const userModel = require("../models/users.model");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY || "mysecretkey";

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(401).json({ msg: "Authorization header is missing" });
  }

  const token = bearerHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Token is missing" });
  }

  try {
    const verifiedToken = jwt.verify(token, SECRET_KEY);
    const user = await userModel.findOne({
      emailId: verifiedToken.user.emailId,
    });

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ msg: "You are unauthorized" });
    }

    console.log("admin verified");
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = verifyToken;
