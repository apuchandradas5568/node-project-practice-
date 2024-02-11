// check usrname, password in post login request

const jwt = require('jsonwebtoken')
const CustomAPIError = require("../errors/custom-error");
// console.log(process.env.JWT_SECRET);
//  if exists create new JWT

// send back to front-end

// setup authentication so only the request with JWT can access the dashboard

const login = async (req, res) => {
  const { username, password } = req.body;

  // mongooose validation
  // Joi -package

  // check in the controller
  if (!username || !password) {
    throw new CustomAPIError("please provide email and password", 400);
  }
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: "30d" });
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new CustomAPIError("No token provided", 401);
    }

    const token = authHeader.split(' ')[1]
    // console.log(token);

    try {
const decoded = jwt.verify(token, process.env.JWT_SECRET)
// console.log(decoded);
const luckyNumber = Math.floor(Math.random() * 100);
res.status(200).json({
  msg: `Hello, ${decoded.username}`,
  secret: `Here is your authorized data ${luckyNumber}`,
});
    } catch (error) {
    throw new CustomAPIError("Not  authorized access to this route", 401);
        
    }

};

module.exports = {
  login,
  dashboard,
};
