const jwt = require("jsonwebtoken");
const {UnauthenticatedError} = require("../errors");

const authenticationMiddleware = async(req,res,next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthenticatedError("No token provided");
    }
  
    const token = authHeader.split(" ")[1];
    // console.log(token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id, username} = decoded
        req.user = {id, username}
        // console.log(decoded);
    next()
        
      } catch (error) {
        throw new UnauthenticatedError("Not  authorized access to this route");
      }
  
}

module.exports = authenticationMiddleware