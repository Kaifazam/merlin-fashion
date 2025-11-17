const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
  res.json(cart || { products: [] });
});

router.post('/add', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) {
    cart = new Cart({ userId: req.user.id, products: [] });
  }
  // Update if exists
  const index = cart.products.findIndex(p => p.productId.toString() === productId);
  if (index > -1) {
    cart.products[index].quantity += (quantity || 1);
  } else {
    cart.products.push({ productId, quantity: quantity || 1 });
  }
  await cart.save();
  res.json(cart);
});

router.post('/remove', auth, async (req, res) => {
  const { productId } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });
  cart.products = cart.products.filter(p => p.productId.toString() !== productId);
  await cart.save();
  res.json(cart);
});

module.exports = router;
