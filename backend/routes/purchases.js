const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// @route   POST api/purchases
// @desc    Record a new purchase
// @access  Private (Admin)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  const { product, supplier, invoice, quantity } = req.body;

  try {
    // Create new purchase
    const newPurchase = new Purchase({
      product,
      supplier,
      invoice,
      quantity,
    });

    const purchase = await newPurchase.save();

    // Update product stock
    await Product.findByIdAndUpdate(product, {
      $inc: { stockQuantity: quantity },
    });

    res.json(purchase);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/purchases
// @desc    Get all purchases
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const purchases = await Purchase.find().populate('product', ['name']).sort({ purchaseDate: -1 });
    res.json(purchases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
