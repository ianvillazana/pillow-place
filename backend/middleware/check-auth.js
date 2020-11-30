const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
require('dotenv').config();

module.exports = (req, res, next) => {
  // Allows OPTIONS request to continue
  if (req.method === "OPTIONS") {
    return next();
  }

  // Authorization: 'Bearer TOKEN' -> split to get token
  try {
    const token = req.headers.authorization.split(' ')[1]; 
    if (!token) {
      throw new Error("Authorization failed.");
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    req.userData = { userId: decodedToken.id };
    next();
  } catch {
    return next(new HttpError("Authorization failed.", 401));
  }
};
