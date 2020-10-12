const express = require('express');
const bodyParser = require('body-parser');

const ordersRoutes = require('./routes/orders-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const server = express();

server.use(bodyParser.json());

server.use('/api/orders', ordersRoutes);

server.use('/api/users', usersRoutes);

// Error handling for unsupported routes
server.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  return next(error);
});

// Applies on every incoming request for error handling
server.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || "An unknown error occured."});
});

server.listen(5000);
