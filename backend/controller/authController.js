const userModel = require("../model/userModel");

exports.registerUser = async (req, res) => {
  const checkUser = await userModel.findOne({ username: req.body.username });
  if (checkUser) {
    res.json({
      message: "user already exits",
      success: false
    });
  } else {
    const register = await userModel.create({
      username: req.body.username,
      password: req.body.password,
    });
    console.log(register);
    res.json({register, success: true});
  }
};

exports.loginUser = async (req, res) => {
  const login = await userModel.findOne({ username: req.body.username });
  if (login) {
    if (login.password === req.body.password) res.json({ login, success: true});
    else res.json({ message: "wrong password", success: false });
  } else res.json({ message: "user does not exist", success: false });
};
