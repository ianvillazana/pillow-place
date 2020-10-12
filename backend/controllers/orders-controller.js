const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error');

let DUMMY_ORDERS = [
  {
    id: "o1",
    dateTime: "2020-10-11 17:49:21",
    items: {
      "PIL-SS-0001": {
        image: "/static/media/aquagel.2187dec3.png",
        name: "Aquagel",
        price: 169.99,
        total: 1
      }
    },
    totalPrice: 169.99,
  }
];

// for GET request: api/orders/:oid
const getOrderById = (req, res, next) => {
  const orderId = req.params.oid;
  const order = DUMMY_ORDERS.find(o => {
    return o.id === orderId
  });

  if (!order) {
    return next(new HttpError("Could not find an order for the provided id.", 404));
  }

  res.json({order});
};

// for POST request: /api/orders
const createOrder = (req, res, next) => {
  const { dateTime, items, totalPrice } = req.body;
  const createdOrder = { id: uuidv4(), dateTime, items, totalPrice };

  DUMMY_ORDERS.push(createdOrder);

  res.status(201).json({order: createdOrder});
};

// for DELETE request: /api/orders/:oid
const deleteOrder = (req, res, next) => {
  const orderId = req.params.oid;
  const order = DUMMY_ORDERS.find(o => {
    return o.id === orderId
  });

  if (!order) {
    return next(new HttpError("Could not find an order for the provided id.", 404));
  }

  DUMMY_ORDERS = DUMMY_ORDERS.filter(o => o.id !== orderId);

  res.status(200).json({message: "Order deleted.", order});
};

exports.getOrderById = getOrderById;
exports.createOrder = createOrder;
exports.deleteOrder = deleteOrder;
