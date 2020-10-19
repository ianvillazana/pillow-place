const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  try {
    // Authorization: 'Bearer TOKEN'
    const token = req.headers.authorization.split(' ')[1]; 
    if (!token) {
      throw new Error('Authentication failed.');
    }
    const decodedToken = jwt.verify(token, 'private_key');
    req.userData = { id: decodedToken.id }
    next();
  } catch {
    return next(new HttpError('Authentication failed.', 401));
  }
};
