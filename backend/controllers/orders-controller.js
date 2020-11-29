const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Order = require('../models/order');
const User = require('../models/user');

const getAllOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.find({});
  } catch {
    return next(new HttpError("Unable to retrieve orders.", 404));
  }

  if (!orders) {
    return next(new HttpError("Unable to retrieve orders.", 404));
  }

  res.status(200).json({ count: orders.length, orders });
};

const getOrderById = async (req, res, next) => {
  const orderId = req.params.oid;

  let order;
  try {
    order = await Order.findById(orderId);
  } catch {
    return next(new HttpError("Could not find an order for the provided id.", 404));
  }

  if (!order) {
    return next(new HttpError("Could not find an order for the provided id.", 404));
  }

  res.status(200).json({ 
    message: "Order found.",
    order: order.toObject({ getters: true }) 
  });
};

const getUserOrdersById = async (req, res, next) => {
  const userId = req.params.uid;

  // Check if user id stored in token matches the customer id
  if (req.userData.userId !== userId.toString()) {
    return next(new HttpError("You are not authorized.", 401));
  }
  
  let user;
  try {
    user = await User.findById(userId);
  } catch {
    return next(new HttpError("Could not find a user for the provided id.", 404));
  }

  if (!user) {
    return next(new HttpError("Could not find a user for the provided id.", 404));
  }

  if (!user.orders) {
    return next(new HttpError("Could not get orders for user.", 404));
  }

  res.status(200).json({ count: user.orders.length, orders: user.orders });
};

const createOrder = async (req, res, next) => {
  const { customerId, dateTime, items, totalPrice } = req.body;
  const createdOrder = new Order({ customerId, dateTime, items, totalPrice });

  // Check if user id stored in token matches the customer id
  if (customerId && (req.userData.userId !== customerId.toString())) {
    return next(new HttpError("You are not authorized.", 401));
  }

  // Check if customer id exists
  let user;
  if (customerId) {
    try {
      user = await User.findById(customerId);
    } catch {
      return next(new HttpError(
        "Creating order failed. Could not find the user with the provided id.", 404
      ));
    }
  }

  // Create order in database and update user's order list
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdOrder.save({ session: sess });
    if (customerId) {
      user.orders.push(createdOrder);
      await user.save({ session: sess });
    }
    await sess.commitTransaction();
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
  
  res.status(201).json({
    message: "Order created successfully.", 
    order: createdOrder.toObject({ getters: true }) 
  });
};

const deleteOrder = async(req, res, next) => {
  const orderId = req.params.oid;

  let order;
  try {
    order = await Order.findById(orderId);
  } catch {
    return next(new HttpError(
      "Deleting order failed. Could not find an order for the provided id.", 404
    ));
  }

  if (!order) {
    return next(new HttpError(
      "Deleting order failed. Could not find an order for the provided id.", 404
    ));
  }

  // Check if user id stored in token matches the customer id of the order
  if (req.userData.userId !== order.customerId.toString()) {
    return next(new HttpError("You are not authorized.", 401));
  }

  // Get user
  let user;
  try {
    user = await User.findById(order.customerId);
  } catch {
    return next(new HttpError(
      "Deleting order failed. Could not find a user with the provided id.", 404
    ));
  }

  if (!user) {
    return next(new HttpError(
      "Deleting order failed. Could not find a user with the provided id.", 404
    ));
  }

  // Delete order from database and update user's order list
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await order.remove({ session: sess });
    user.orders.pull(order);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  res.status(200).json({ message: "Order deleted." });
};

module.exports = { 
  getAllOrders, getOrderById, getUserOrdersById, createOrder, deleteOrder 
};
