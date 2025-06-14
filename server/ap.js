const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const { protect } = require('./middleware/authMiddleware');
const errorHandler = require('./middleware/errorMiddleware');
const app = express();

// Connect to database
connectDB();
// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/invoices', invoiceRoutes);
// Error handling middleware
app.use(errorHandler);
module.exports = app; 