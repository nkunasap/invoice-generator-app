// server/services/recurringService.js
const cron = require('node-cron');
const Invoice = require('../models/Invoice');

exports.setupRecurringInvoices = () => {
  // Run every day at midnight
  cron.schedule('0 0 * * *', async () => {
    const recurringInvoices = await Invoice.find({ 
      isRecurring: true, 
      nextRecurrence: { $lte: new Date() }
    });
    
    recurringInvoices.forEach(async (invoice) => {
      // Generate new invoice based on template
      const newInvoice = new Invoice({ ...invoice.toObject(), _id: undefined });
      newInvoice.date = new Date();
      newInvoice.nextRecurrence = calculateNextDate(invoice.recurrenceInterval);
      
      await newInvoice.save();
      // Send email notification
    });
  });
};