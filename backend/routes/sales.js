const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// @route   POST api/sales
// @desc    Record a new sale
// @access  Private
router.post('/', auth, async (req, res) => {
  const { product, customer, invoice, quantity } = req.body;

  try {
    // Create new sale
    const newSale = new Sale({
      product,
      customer,
      invoice,
      quantity,
    });

    const sale = await newSale.save();

    // Update product stock
    await Product.findByIdAndUpdate(product, {
      $inc: { stockQuantity: -quantity },
    });

    res.json(sale);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/sales
// @desc    Get all sales
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const sales = await Sale.find().populate('product', ['name']).sort({ saleDate: -1 });
    res.json(sales);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
