const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');
const invoiceRoutes = require('./routes/invoiceRoutes.js');
const { protect } = require('./middleware/authMiddleware.js');
const errorHandler = require('./middleware/errorMiddleware.js');
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