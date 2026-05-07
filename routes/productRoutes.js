const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

// GET all products with search/filter
router.get('/', async (req, res) => {
  const { search, category } = req.query;
  let query = {};
  if (search) query.name = { $regex: search, $options: 'i' };
  if (category) query.category = category;

  try {
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin only: Add product
router.post('/', protect, admin, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

module.exports = router;