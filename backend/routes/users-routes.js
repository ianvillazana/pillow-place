const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controller');

const router = express.Router();

router.get('/orders/:uid', usersController.getUserOrdersById);

// TODO: PATCH user's list of orders: /orders/:uid/:oid

// TODO: DELETE an order from user's list: /orders/:uid/:oid

router.post('/signup', [
  check('name').not().isEmpty(),
  check('email').not().normalizeEmail().isEmail(),
  check('password').isLength({ min: 6 })
], usersController.signup);

router.post('/login', usersController.login);

module.exports = router;
