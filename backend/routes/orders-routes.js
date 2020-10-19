const express = require('express');

const ordersController = require('../controllers/orders-controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/:oid', ordersController.getOrderById);

router.post('/', ordersController.createOrder);

// Any route after this check are protected and can only be reached with 
// a valid token.
//router.use(checkAuth);

router.delete('/:oid', ordersController.deleteOrder);

module.exports = router;
