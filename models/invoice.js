'use strict'
const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    amount: Number,
    actual_amount: Number,
    tax_amount: Number,
    receiver: String,
},{
    timestamps: true
}
)

module.exports = mongoose.model('invoice', invoiceSchema)


// Write a simple API in nodejs that 
// POST /invoices : receives invoice payload, calculate tax and total and then store the data to database
// Get /invoices: return list of invoices and summary(invoice_count, total_invoice_amount)
// It must have a swagger doc
// It must have a proper database
//  Provide some example of config file separation for dev and prod environments

//  Oyedemi.abiola@andela.com