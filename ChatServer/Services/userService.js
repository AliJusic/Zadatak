//Login
//Register with random name and password
//Get user info
//Get specific user
const ServiceResponse = require("../Models/ServiceResponse");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
var generator = require("generate-password");

const { generateUsername } = require("unique-username-generator");

const loginUser = async (name, password) => {
  const serviceResponse = new ServiceResponse({ success: false });

  try {
    const foundUser = await User.findOne({ name: name });

    if (!foundUser) {
      serviceResponse.message = "Username is not in use!";
      return serviceResponse;
    }
    let isPassCorrect = false;
    if (password == foundUser.password) isPassCorrect = true;

    if (isPassCorrect) {
      const token = jwt.sign(
        { userID: foundUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "6h",
        }
      );

      serviceResponse.success = true;
      serviceResponse.message = "Successful login";
      serviceResponse.data = {
        user: {
          name: foundUser.name,
          password: foundUser.password,
        },
        token: token,
      };
    } else {
      serviceResponse.message = "Incorrect Password";
    }
  } catch (err) {
    serviceResponse.message = err.message;
  }
  return serviceResponse;
};

const generateUser = async () => {
  const serviceResponse = new ServiceResponse({ success: false });

  try {
    const username = generateUsername();
    const password = generator.generate({
      length: 8,
      numbers: true,
    });

    const newUser = new User({ name: username, password, online: true });
    await newUser.save();

    const token = jwt.sign({ userID: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    serviceResponse.success = true;
    serviceResponse.message = "User generated successfully";
    serviceResponse.data = {
      user: {
        name: newUser.name,
        password: newUser.password,
        online: newUser.online,
      },
      token: token,
    };
  } catch (err) {
    serviceResponse.message = err.message;
  }

  return serviceResponse;
};
// const generateUser = async () => {
//   const username = generateUsername();
//   const password = generator.generate({
//     length: 5,
//     numbers: true,
//   });
//   const user = { name: username, password: password, online: true };
//   return user;
// };

// const userService = { registerUser, loginUser, getUser, getSpecificUser };
const userService = { loginUser, generateUser };
module.exports = userService;
