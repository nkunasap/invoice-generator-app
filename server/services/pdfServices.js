// server/services/pdfService.js
const PdfPrinter = require('pdfmake');
const fonts = {/* Font configuration */};

exports.generateInvoicePDF = (invoice) => {
  const printer = new PdfPrinter(fonts);
  const docDefinition = {
    content: [
      { text: 'INVOICE', style: 'header' },
      `Invoice #: ${invoice.invoiceNumber}`,
      `Date: ${new Date(invoice.date).toLocaleDateString()}`,
      // ... other invoice details
    ],
    styles: {/* PDF styles */}
  };
  
  return printer.createPdfKitDocument(docDefinition);
};