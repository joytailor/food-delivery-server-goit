const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const timestamp = require('../middlewares/timestamp');

const orderSchema = new Schema({
  creator: String,
  productList: [
    {
      productID: String, 
      type: { type: String },
      itemsCount: Number,
    } 
  ],
    deliveryType: String,
    deliveryAddress: String,
    sumToPay: Number,
    status: String,
});

orderSchema.plugin(timestamp);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
