const User = require("../Models/User");

const userService = require("../Services/userService");

const userLogin = async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const result = await execUserLogin(name, password);
  res.send(result);
};

const execUserLogin = async (name, password) => {
  return await userService.loginUser(name, password);
};

// const userLogin = async (req, res) => {
//   const { name, password } = req.body;
//   const result = await userService.loginUser(name, password);
//   res.send(result);
// };

const generateAndLoginUser = async (req, res) => {
  const result = await userService.generateUser();
  res.send(result);
};

const userController = { userLogin, generateAndLoginUser };

module.exports = userController;
