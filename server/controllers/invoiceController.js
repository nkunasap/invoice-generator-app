const Invoice = require('...models/invoice');

const { sendInvoiceEmail } = require('../services/emailService');

const { generatePDF } = require('../utils/pdfGenerator');

// @desc    Create a new invoice

// @route   POST /api/invoices

exports.createInvoice = async (req, res) => {

const { clientName, clientEmail, items, total, dueDate, isRecurring, recurringInterval } = req.body;

try {
    const invoice = new Invoice({

user: req.user.id,

clientName,

clientEmail,

items,

total,

dueDate,

isRecurring,

recurringInterval,
nextRecurringDate: isRecurring ? calculateNextDate(dueDate, recurringInterval) : null

});

await invoice.save();

// Generate PDF and send email

const pdfBuffer = await generatePDF(invoice);

await sendInvoiceEmail(clientEmail, pdfBuffer, invoice._id);

res.status(201).json(invoice);
} catch (err) {

console.error(err.message);

res.status(500).send('Server error');

}

};

// Helper function to calculate next recurring date

function calculateNextDate(date, interval) {

let nextDate = new Date(date);

switch (interval) {

case 'weekly':

nextDate.setDate(nextDate.getDate() + 7);

break;

case 'monthly':

nextDate.setMonth(nextDate.getMonth() + 1);

break;

case 'yearly':

nextDate.setFullYear(nextDate.getFullYear() + 1);

break;

default:

break;

}

return nextDate;

}

// @desc    Get all invoices for a user

// @route   GET /api/invoices

exports.getInvoices = async (req, res) => {

try {

const invoices = await Invoice.find({ user: req.user.id }).sort({ createdAt: -1 });

res.json(invoices);

} catch (err) {

console.error(err.message);

res.status(500).send('Server error');

}

};

// @desc    Update invoice

// @route   PUT /api/invoices/:id

exports.updateInvoice = async (req, res) => {

const { clientName, clientEmail, items, total, dueDate, isPaid, isRecurring, recurringInterval } = req.body;


try {

let invoice = await Invoice.findById(req.params.id);

if (!invoice) {

return res.status(404).json({ msg: 'Invoice not found' });

// Check user

if (invoice.user.toString() !== req.user.id) {

return res.status(401).json({ msg: 'User not authorized' });

}

invoice = await Invoice.findByIdAndUpdate(

req.params.id,

{ $set: { clientName, clientEmail, items, total, dueDate, isPaid, isRecurring, recurringInterval }
 
},
{ new: true }
);
res.json(invoice);
}catch (err) {
 console.error(err.message);
 res.status(500).send('Server error');
}
};

// @desc    Delete invoice

// @route   DELETE /api/invoices/:id
exports.deleteInvoice = async (req, res) => {

try {
    const invoice = await Invoice.findById(req.params.id);

if (!invoice) {

return res.status(404).json({ msg: 'Invoice not found' });

}

// Check user

if (invoice.user.toString() !== req.user.id) {

return res.status(401).json({ msg: 'User not authorized' });

}

await invoice.remove();

res.json({ msg: 'Invoice removed' });

} catch (err) {

console.error(err.message);
res.status(500).send('Server error');

}
};