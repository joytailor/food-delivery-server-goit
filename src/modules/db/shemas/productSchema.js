const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const timestamp = require('../middlewares/timestamp');

const productSchema = new Schema({
  sku: Number,
  name: String,
  description: String,
  price: Number,
  currency: String,
  creatorId: String,
  categories: Array,
  likes: Number,
});

productSchema.plugin(timestamp);

const Product = mongoose.model('Product', productSchema)

module.exports = Product;
