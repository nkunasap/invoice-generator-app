const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Apply middleware
app.use(bodyParser.json());

// Import routes
const authRoutes = require('./routes/auth');
const invoiceRoutes = require('./routes/invoices');

// Use routes
app.use('/auth', authRoutes);
app.use('/invoices', invoiceRoutes);

module.exports = app;