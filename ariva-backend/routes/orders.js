const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// Get orders (admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create order
router.post('/', async (req, res) => {
  console.log('Received order request:', req.body);
  const order = new Order(req.body);
  try {
    const newOrder = await order.save();
    console.log('Order saved:', newOrder);
    res.status(201).json(newOrder);
  } catch (err) {
    console.log('Order save error:', err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;