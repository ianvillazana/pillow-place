const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  sku: { type: String, required: true },
  total: { type: String, required: true }
});

const orderSchema = new Schema({
  customer: { type: String, required: false },
  dateTime: { type: String, required: true },
  items: { type: [itemsSchema], required: true },
  totalPrice: { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
