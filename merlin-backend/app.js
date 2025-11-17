require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

const app = express();
app.use(cors());
app.use(express.json());

// Simple root route
app.get('/', (req, res) => {
  res.json({ message: "Backend is running" });
});

// Modern Mongoose connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
