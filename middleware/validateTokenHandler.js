const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "Unauthorised Access!!" });
      }
      req.user = decoded.user;
      next();
    });
    if (!token) {
      res
        .status(401)
        .json({ message: "User is not authorised or token is missing" });
    }
  }
});

module.exports = validateToken;
