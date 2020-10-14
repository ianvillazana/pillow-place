const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUserOrdersById = async (req, res, next) => {
  const userId = req.params.uid;
  
  let user;
  try {
    user = await User.findById(userId);
  } catch {
    return next(new HttpError("Could not find a user for the provided id.", 404));
  }

  res.json({orders: user.orders});
}

const signup = async (req, res, next) => {
  // Input error checking using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed. Please try again.", 422));
  }

  const { name, email, password } = req.body;

  // Check if user already exists and return an error of so
  let existingUser;
  try {
    existingUser = await User.findOne({ email })
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  if (existingUser) {
    return next(new HttpError("User already exists. Please log in instead.", 422));
  }

  const createdUser = new User({ name, email, password, orders: [] });

  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email })
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  if (!existingUser || existingUser.password !== password) {
    return next(new HttpError("Login failed. User does not exist or password is incorrect.", 401));
  }

  res.json({ message: "Login successful." });
};

exports.getUserOrdersById = getUserOrdersById;
exports.signup = signup;
exports.login = login;
