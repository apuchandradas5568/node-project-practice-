// check usrname, password in post login request

const jwt = require("jsonwebtoken");
const {BadRequestErrorError} = require("../errors");

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
    throw new BadRequestErrorError("please provide email and password");
  }
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
    console.log(req.user);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello, ${req.user.username}`,
      secret: `Here is your authorized data ${luckyNumber}`,
    });

};

module.exports = {
  login,
  dashboard,
};

// 6:14 minutes