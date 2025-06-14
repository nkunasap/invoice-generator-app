const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({

service: 'gmail',

auth: {

user: process.env.EMAIL_USER,

pass: process.env.EMAIL_PASS

}

});

const sendInvoiceEmail = async (toEmail, pdfBuffer, invoiceId) => {

const mailOptions = {

from: process.env.EMAIL_USER,

to: toEmail,

subject: `Invoice #${invoiceId}`,

text: 'Please find your invoice attached.',

attachments: [

{
    filename: `invoice_${invoiceId}.pdf`,

content: pdfBuffer,

contentType: 'application/pdf'

}

]

};

try {

await transporter.sendMail(mailOptions);

console.log('Email sent');

} catch (error) {

console.error('Error sending email', error);

}

};

module.exports = { sendInvoiceEmail };