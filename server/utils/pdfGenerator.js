const PdfPrinter = require('pdfmake');

const fs = require('fs');

const fonts = {

Roboto: {

normal: 'node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf',

bold: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',

italics: 'node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf',
bolditalics: 'node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf'
}

};

const printer = new PdfPrinter(fonts);

const generatePDF = (invoice) => {

return new Promise((resolve, reject) => {

const docDefinition = {

content: [

{ text: 'INVOICE', style: 'header' },

`Invoice ID: ${invoice._id}`,

`Client: ${invoice.clientName}`,

`Total: $${invoice.total}`,
`Due Date: ${invoice.dueDate.toLocaleDateString()}`

],

styles: {

header: {

fontSize: 18,

bold: true,

margin: [0, 0, 0, 10]

}

}

};
const pdfDoc = printer.createPdfKitDocument(docDefinition);

const chunks = [];

pdfDoc.on('data', (chunk) => chunks.push(chunk));

pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));

pdfDoc.end();

});

};
module.exports = { generatePDF };