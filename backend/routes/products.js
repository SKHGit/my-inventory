const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth'); // We will create this middleware later

// @route   POST api/products
// @desc    Add new product
// @access  Private (Admin)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  const {
    name,
    category,
    brand,
    supplier,
    costPrice,
    sellingPrice,
    stockQuantity,
    reorderLevel,
  } = req.body;

  try {
    const newProduct = new Product({
      name,
      category,
      brand,
      supplier,
      costPrice,
      sellingPrice,
      stockQuantity,
      reorderLevel,
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/products
// @desc    Get all products
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const products = await Product.find().sort({ date: -1 });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/products/:id
// @desc    Get single product
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/products/:id
// @desc    Update product
// @access  Private (Admin)
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  const {
    name,
    category,
    brand,
    supplier,
    costPrice,
    sellingPrice,
    stockQuantity,
    reorderLevel,
  } = req.body;

  const productFields = {};
  if (name) productFields.name = name;
  if (category) productFields.category = category;
  if (brand) productFields.brand = brand;
  if (supplier) productFields.supplier = supplier;
  if (costPrice) productFields.costPrice = costPrice;
  if (sellingPrice) productFields.sellingPrice = sellingPrice;
  if (stockQuantity) productFields.stockQuantity = stockQuantity;
  if (reorderLevel) productFields.reorderLevel = reorderLevel;

  try {
    let product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: 'Product not found' });

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/products/:id
// @desc    Delete product
// @access  Private (Admin)
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  try {
    let product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: 'Product not found' });

    await Product.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
