const HttpError = require('../models/http-error');
require('dotenv').config();

// Error handling for unsupported routes
const notFound = (req, res, next) => {
  return next(new HttpError(`Route not found - ${req.originalUrl}`, 404));
};

// Applies on every incoming request for error handling
const handleError = (error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured." });
};

module.exports = { notFound, handleError };
