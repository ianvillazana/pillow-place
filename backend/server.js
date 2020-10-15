const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const ordersRoutes = require('./routes/orders-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
require('dotenv').config();

const server = express();

server.use(bodyParser.json());

// Handles browser CORS policy
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization' 
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

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

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
  })
  .then(() => server.listen(5000))
  .catch(error => console.log(error));
