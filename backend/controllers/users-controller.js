const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

let DUMMY_USERS = [
  {
    id: "u1",
    name: "Max Scwarz",
    email: "test@test.zzz",
    password: "testers"
  }
]

// for POST request: api/users/signup
const signup = (req, res, next) => {
  // Input error checking using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed. Please try again."));
  }

  const { name, email, password } = req.body;

  // Check if user already exists and then return error
  const hasUser = DUMMY_USERS.find(u => u.email === email);
  if (hasUser) {
    return next(new HttpError("Could not create user. Email already exists.", 422));
  }

  const createdUser = { id: uuidv4(), name, email, password };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({user: createdUser});
};

// for POST request: api/users/login
const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    return next(new HttpError("Login failed. User does not exist or password is incorrect.", 401));
  }

  res.json({message: "Login successful."});
};

exports.signup = signup;
exports.login = login;
