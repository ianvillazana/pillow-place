const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  sku: { type: String, required: true },
  count: { type: Number, required: true }
});

const orderSchema = new Schema({
  customerId: { type: mongoose.Types.ObjectId, required: false, ref: 'User' },
  dateTime: { type: String, required: true },
  items: [{ type: itemsSchema, required: true }],
  totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
