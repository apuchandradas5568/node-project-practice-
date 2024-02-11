// check usrname, password in post login request


//  if exists create new JWT


// send back to front-end


// setup authentication so only the request with JWT can access the dashboard








const login = async (req, res) => {
  res.send("Fake Login/Register/Signup Route");
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res
    .status(200)
    .json({
      msg: `Hello, John Doe`,
      secret: `Here is your authorized data ${luckyNumber}`,
    });
};

module.exports = {
  login,
  dashboard,
};
