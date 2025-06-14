const express = require('express');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

const { createInvoice, getInvoices, updateInvoice, deleteInvoice } = require('../controllers/invoiceController');

router.route('/')

.post(protect, createInvoice)

.get(protect, getInvoices);

router.route('/:id')

.put(protect, updateInvoice)
.delete(protect, deleteInvoice);

module.exports = router;