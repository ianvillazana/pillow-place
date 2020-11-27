const express = require('express');

const ordersController = require('../controllers/orders-controller');

const router = express.Router();

router.get('/', ordersController.getAllOrders);

router.get('/:oid', ordersController.getOrderById);

router.get('/user/:uid', ordersController.getUserOrdersById);

router.post('/', ordersController.createOrder);

router.delete('/:oid', ordersController.deleteOrder);

module.exports = router;
