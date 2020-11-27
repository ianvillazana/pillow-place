const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const errors = require('./middleware/errors');
const ordersRoutes = require('./routes/orders-routes');
const usersRoutes = require('./routes/users-routes');
require('dotenv').config();

const server = express();

server.use(bodyParser.json());

server.use(helmet());

server.use(cors());

server.use('/api/orders', ordersRoutes);

server.use('/api/users', usersRoutes);

server.use(errors.notFound);

server.use(errors.handleError);

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
  })
  .then(() => server.listen(process.env.PORT || 5000));
