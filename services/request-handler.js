const jwt = require("jsonwebtoken")
const secretKey = "secretToken" //env var

exports.verifyToken = async (req, res,next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header required" });
    }
  
    const token = authHeader.split(" ")[1];
    try {
      const decoded = await jwt.verify(token, secretKey);
      console.log(decoded)
      req.user = decoded;
      next();
    } catch (err) {
      console.log(err)
      return res.status(401).json({ message: "Invalid hhhhhhhh token" });
    }
  }