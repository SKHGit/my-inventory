const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaleSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  customer: {
    type: String,
  },
  invoice: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  saleDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Sale', SaleSchema);
