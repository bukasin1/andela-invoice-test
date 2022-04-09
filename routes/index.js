var express = require('express');
var router = express.Router();
const Invoices = require('../models/invoice')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/invoices', async(req, res) => {
  try{
    const { amount, receiver, tax_percentage } = req.body
    if(!amount || !receiver || !tax_percentage){
      return res.status(401).send({
        status: "Unsuccesful",
        message: "Please enter all inputs"
      })
    }
    if(+tax_percentage < 0){
      return res.status(401).send({
        status: "Unsuccesful",
        message: "Tax percentage must be greater than zero"
      })
    }
    if(+amount < 0){
      return res.status(401).send({
        status: "Unsuccesful",
        message: "Amount must greater than zero"
      })
    }
    const tax = 1 + (+tax_percentage/100)
    const actual_amount = +amount/tax
    const tax_amount = amount - actual_amount

    console.log(actual_amount.toFixed(2), tax_amount.toFixed(2), actual_amount + tax_amount)

    const invoice = await Invoices.create({
      amount: +amount,
      actual_amount: +actual_amount.toFixed(2),
      tax_amount: +tax_amount.toFixed(2),
      receiver
    })
    res.status(201).send({
      status: "Successful!",
      invoice
    })
  }catch(error){
    console.log("Error occured",error)
  }
})

router.get('/invoices', async(req, res) => {
  try{
    const invoices = await Invoices.find({})
    const invoice_count = invoices.length
    let total_invoice_amount = 0
    for(let invoice of invoices){
      total_invoice_amount += invoice.amount
    }
    res.status(200).send({
      invoices,
      summary: {
        invoice_count,
        total_invoice_amount
      }
    })
  }catch(error){
    console.log("Error occured",error)
  }
})


module.exports = router;
