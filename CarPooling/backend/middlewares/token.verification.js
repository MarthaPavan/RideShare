const { verify } = require("jsonwebtoken");

verifyToken = (req, res, next) => {
    // Get auth header value (token will typically be sent in the Authorization header)
    const bearerHeader = req.headers['authorization'];
    console.log(req.headers.authorization);
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
      // Split token from "Bearer <token>"
      const bearer = bearerHeader.split(' ');
      const token = bearer[1];
      // Verify token
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          // Token is not valid
          return res.status(403).json({ error: 'Unauthorized' });
        } else {
          // Token is valid, attach the decoded user payload to the request object
          console.log("You are authorised user");
          req.user = decoded.user;
          next(); // Move to the next middleware
        }
      });
    } else {
      // Forbidden if token is missing
      res.status(403).json({ error: 'Token is missing' });
    }
  }
module.exports = verifyToken;