const express = require('express');

const ordersController = require('../controllers/orders-controller');

const router = express.Router();

router.post('/', ordersController.createOrder);

router.get('/:oid', ordersController.getOrderById);

router.delete('/:oid', ordersController.deleteOrder);

module.exports = router;
