const userModel = require("../models/usermodel");
const errorResponse = require("../utils/errorResponse");

// Send token
exports.sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res);
  res.status(statusCode).json({
    success: true,
    token,
  });
};

// Register controller
exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next(new errorResponse("User already exists", 400));
    }

    // Create a new user
    const user = await userModel.create({ username, email, password });

    // Send the token
    exports.sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Login controller
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return next(new errorResponse("Please provide email and password", 400));
    }

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new errorResponse("Invalid credentials", 401));
    }

    // Match password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse("Invalid credentials", 401));
    }

    // Send the token
    exports.sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Logout controller
exports.logoutController = async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
