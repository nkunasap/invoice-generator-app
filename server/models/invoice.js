const mongoose = require('mongoose');
const InvoiceSchema = new mongoose.Schema({

user: {
type: mongoose.Schema.Types.ObjectId,
ref: 'User',
required: true
},

clientName: {
type: String,
required: true
},

clientEmail: {
type: String,
required: true
},

items: [{
description: String,
quantity: Number,
price: Number
}],

total: {
type: Number,
required: true
},

dueDate: {
type: Date,
required: true

},

isPaid: {
type: Boolean,
default: false
},

isRecurring: {
type: Boolean,
default: false
},

recurringInterval: {
type: String, // e.g., 'monthly', 'weekly'
default: null
},

nextRecurringDate: {
type: Date,
default: null
},

createdAt: {
type: Date,
default: Date.now
}

});
module.exports = mongoose.model('Invoice', InvoiceSchema)