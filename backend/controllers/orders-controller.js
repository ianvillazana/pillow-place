const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error');
const Order = require('../models/order');

const getOrderById = async (req, res, next) => {
  const orderId = req.params.oid;

  let order;
  try {
    order = await Order.findById(orderId);
  } catch(error) {
    return next(error);
  }

  if (!order) {
    return next(new HttpError("Could not find an order for the provided id.", 404));
  }

  res.json({ order: order.toObject({ getters: true }) });
};

const createOrder = async (req, res, next) => {
  const { customer, dateTime, items, totalPrice } = req.body;
  const createdOrder = new Order({ customer, dateTime, items, totalPrice });

  try {
    await createdOrder.save();
  } catch (error) {
    return next(error);
  }
  
  res.status(201).json({ order: createdOrder });
};

const deleteOrder = async(req, res, next) => {
  const orderId = req.params.oid;
  
  let order;
  try {
    order = await Order.findById(orderId);
  } catch (error) {
    return next(error);
  }

  if (!order) {
    return next(new HttpError("Could not find an order for the provided id.", 404));
  }

  try {
    await order.remove();
  } catch (error) {
    return next(error);
  }

  res.status(200).json({message: "Order deleted."});
};

exports.getOrderById = getOrderById;
exports.createOrder = createOrder;
exports.deleteOrder = deleteOrder;
