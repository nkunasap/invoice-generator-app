const cron = require('node-cron');
const Invoice = require('/server/models/invoice');
const { sendInvoiceEmail } = require('./emailService');
const { generatePDF } = require('../utils/pdfGenerator');

// Run every day at midnight

cron.schedule('0 0 * * *', async () => {
try {
    const today = new Date();
today.setHours(0, 0, 0, 0);

// Find recurring invoices where nextRecurringDate is today

const recurringInvoices = await Invoice.find({
isRecurring: true,
nextRecurringDate: { $lte: today }
});

for (const invoice of recurringInvoices) {

// Create a new invoice for the next period

const newInvoice = new Invoice({
user: invoice.user,
clientName: invoice.clientName,
clientEmail: invoice.clientEmail,
items: invoice.items,
total: invoice.total,
dueDate: invoice.dueDate,
isRecurring: true,
recurringInterval: invoice.recurringInterval,
nextRecurringDate: calculateNextDate(invoice.nextRecurringDate, invoice.recurringInterval)
});

await newInvoice.save();

// Generate PDF and send email
const pdfBuffer = await generatePDF(newInvoice);
await sendInvoiceEmail(newInvoice.clientEmail, pdfBuffer, newInvoice._id);

// Update the nextRecurringDate for the original invoice to the next period

invoice.nextRecurringDate = newInvoice.nextRecurringDate;
await invoice.save();
}

} catch (err) {
console.error('Error in recurring invoice cron job', err);
}
});

// Helper function to calculate next recurring date (same as in controller)

function calculateNextDate(date, interval) {
// ... same as in the controller
}

function setupCronJobs() {
// The cron.schedule is already set up, so we just log
console.log('Cron jobs scheduled');
}

module.exports = { setupCronJobs };

