const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  if (!users) {
    return next(new HttpError("Could not find any users.", 404));
  }

  res.status(200).json({ message: "Users found.", users });
};

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
    return next(new HttpError(error.message, 500));
  }

  if (existingUser) {
    return next(new HttpError("User already exists. Please log in instead.", 422));
  }

  // Create an encrypted password (12 salting rounds)
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
  
  const createdUser = new User({ 
    name, email, password: hashedPassword, orders: [] 
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  res.status(201).json({ 
    message: "New user created successfully.",
    user: { 
      id: createdUser.id, 
      email: createdUser.email, 
      name: createdUser.name
    }
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email })
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  if (!existingUser) {
    return next(new HttpError(
      "Login failed. User does not exist or password is incorrect.", 401
    ));
  }

  // Decrypt hashed password and compare
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
  
  if (!isValidPassword) {
    return next(new HttpError(
      "Login failed. User does not exist or password is incorrect.", 401
    ));
  }

  res.status(202).json({ 
    message: "Login accepted.", 
    user: {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name
    }
  });
};

module.exports = { getAllUsers, signup, login };
