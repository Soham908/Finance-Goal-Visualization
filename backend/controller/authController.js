const userModel = require("../model/userModel");


// the route for this function  => /api/auth/register (post)
// the data required            => username and password
exports.registerControllerFunc = async (req, res) => {
  try {
    const checkUser = await userModel.findOne({ username: req.body.username });
    if (checkUser) {
      res.json({
        message: "user already exits",
        success: false,
      });
    } else {
      const register = await userModel.create({
        username: req.body.username,
        password: req.body.password,
      });
      console.log(register);
      res.json({ success: true, register });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error,
    });
  }
};

// the route for this function  => /api/auth/login (post)
// the data required            => username and password
exports.loginControllerFunc = async (req, res) => {
  try {
    const login = await userModel.findOne({ username: req.body.username });
    if (login) {
      if (login.password === req.body.password)
        res.json({ success: true, login });
      else res.json({ success: false, message: "wrong password" });
    } else res.json({ success: false, message: "user does not exist"});
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error,
    });
  }
};
