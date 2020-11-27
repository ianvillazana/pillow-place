const express = require('express');

const ordersController = require('../controllers/orders-controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', ordersController.getAllOrders);

router.get('/:oid', ordersController.getOrderById);

router.get('/user/:uid', ordersController.getUserOrdersById);

router.post('/guest', ordersController.createOrder);

// Routes after this middleware are protected and require a token
router.use(checkAuth);

router.post('/user', ordersController.createOrder);

router.delete('/:oid', ordersController.deleteOrder);

module.exports = router;
