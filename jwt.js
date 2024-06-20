const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {

    //checking header 
    const authorization = req.headers.authorization
    if (!authorization) {
        return res.status(401).json({ error: "Unauthorized token" });
        }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "unauthorized" });
  try {
    //Verifiying token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //attach user info
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Ivalid Token" });
  }
};


//Funcation to genrate JWT
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET)
}
module.exports = { jwtAuthMiddleware, generateToken };




