const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, async (req, res) => {
  const { items, total } = req.body;
  const order = await Order.create({ user: req.user.id, items, total });
  res.status(201).json(order);
});

router.get('/my', protect, async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
});

module.exports = router;