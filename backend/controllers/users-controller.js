const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

  if (!user) {
    return next(new HttpError("Could not find a user for the provided id.", 404));
  }

  res.status(200).json({
    message: "Orders for user was found.", 
    orders: user.orders 
  });
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

  // Create token that expires in 1hr
  let token;
  try {
    token = jwt.sign({
      id: createdUser.id, email: createdUser.email, name: createdUser.name
    }, 'private_key', { expiresIn: '1h' });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  res.status(201).json({ 
    message: "New user created successfully.",
    user: { 
      id: createdUser.id, 
      email: createdUser.email, 
      name: createdUser.name,
      token: token
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

  let token;
  try {
    token = jwt.sign({
      id: existingUser.id, email: existingUser.email, name: existingUser.name
    }, 'private_key', { expiresIn: '1h' });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  res.status(202).json({ 
    message: "Login accepted.", 
    user: {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
      token: token
    }
  });
};

exports.getUserOrdersById = getUserOrdersById;
exports.signup = signup;
exports.login = login;
