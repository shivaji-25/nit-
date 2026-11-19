const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const seedUsers = require('./seed/seedUsers');

dotenv.config();

const app = express();

// Database Connection
connectDB().then(async () => {
  // Ensure default role test users exist
  await seedUsers();
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Food Manufacturer Order-to-Audit API is running',
    version: '1.0.0',
    documentation: '/docs',
  });
});

app.use('/auth', authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});