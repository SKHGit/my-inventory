const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Purchase = require('../models/Purchase');
const Sale = require('../models/Sale');
const auth = require('../middleware/auth');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');

// @route   GET api/reports/stock
// @desc    Get current stock report
// @access  Private (Admin)
router.get('/stock', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/reports/stock/download
// @desc    Download current stock report
// @access  Private (Admin)
router.get('/stock/download', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    try {
      const products = await Product.find();

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Stock Report');

      worksheet.columns = [
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Category', key: 'category', width: 20 },
        { header: 'Stock Quantity', key: 'stockQuantity', width: 15 },
      ];

      products.forEach(product => {
        worksheet.addRow(product);
      });

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=' + 'stock_report.xlsx'
      );

      return workbook.xlsx.write(res).then(() => {
        res.status(200).end();
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route   GET api/reports/low-stock
// @desc    Get low stock report
// @access  Private (Admin)
router.get('/low-stock', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  try {
    const products = await Product.find({
      $expr: { $lte: ['$stockQuantity', '$reorderLevel'] },
    });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/reports/purchases
// @desc    Get purchases report
// @access  Private (Admin)
router.get('/purchases', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    try {
      const purchases = await Purchase.find().populate('product', 'name');
      res.json(purchases);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route   GET api/reports/sales
// @desc    Get sales report
// @access  Private (Admin)
router.get('/sales', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized' });
    }

    try {
        const sales = await Sale.find().populate('product', ['name', 'costPrice', 'sellingPrice']);
        res.json(sales);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   GET api/reports/dashboard/summary
// @desc    Get dashboard summary
// @access  Private (Admin)
router.get('/dashboard/summary', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized' });
    }

    try {
        const totalStockValue = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalValue: { $sum: { $multiply: ['$costPrice', '$stockQuantity'] } },
                },
            },
        ]);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todaysSales = await Sale.aggregate([
            {
                $match: {
                    saleDate: { $gte: today },
                },
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: '$quantity' },
                },
            },
        ]);

        const lowStockProducts = await Product.find({
            $expr: { $lte: ['$stockQuantity', '$reorderLevel'] },
        }).countDocuments();

        res.json({
            totalStockValue: totalStockValue.length > 0 ? totalStockValue[0].totalValue : 0,
            todaysSales: todaysSales.length > 0 ? todaysSales[0].totalSales : 0,
            lowStockProducts,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/reports/dashboard/monthly-sales
// @desc    Get monthly sales chart data
// @access  Private (Admin)
router.get('/dashboard/monthly-sales', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized' });
    }

    try {
        const sales = await Sale.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: '$saleDate' },
                        month: { $month: '$saleDate' },
                    },
                    totalSales: { $sum: '$quantity' },
                },
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 },
            },
        ]);
        res.json(sales);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/reports/dashboard/top-selling
// @desc    Get top selling products chart data
// @access  Private (Admin)
router.get('/dashboard/top-selling', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized' });
    }

    try {
        const topSelling = await Sale.aggregate([
            {
                $group: {
                    _id: '$product',
                    totalQuantity: { $sum: '$quantity' },
                },
            },
            {
                $sort: { totalQuantity: -1 },
            },
            {
                $limit: 5,
            },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'productDetails',
                },
            },
            {
                $unwind: '$productDetails',
            },
        ]);
        res.json(topSelling);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
