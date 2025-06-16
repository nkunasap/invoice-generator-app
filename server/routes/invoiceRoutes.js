const express = require('express');
const router = express.Router();
const { protect } = require('server/middleware/middleware/authMiddleware');
const { createInvoice, getInvoices, updateInvoice, deleteInvoice } = require('server/controllers/invoiceController.js');

router.route('/')
.post(protect, createInvoice)
.get(protect, getInvoices);
router.route('/:id')

.put(protect, updateInvoice)
.delete(protect, deleteInvoice);

module.exports = router;
