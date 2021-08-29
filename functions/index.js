const functions = require("firebase-functions");

const express = require('express')
const cors = require('cors')
const stripe = require('stripe')('sk_test_51JSaTqSJpC0rnFhpll5ATk1lkQkCLS6BYxD4t4LR0StEQExHtGaE8EKVRn8g2tq0SXKYdObE8XgIKtoBilgwrJmo00uVd1ObPh')

// app config
const app = express();

// midddlewares
app.use(cors({origin:true}))
app.use(express.json())

// api routes
app.get('/',(req,res)=>{
    res.status(200).send("hello peter");
});

app.post('/payments/create',async(req,res)=>{
    const total = req.query.total;
    console.log("payment request for",total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,
        currency:"usd"
    });
    res.status(201).send({
        clientSecret:paymentIntent.client_secret,
    })
})

// listeners
exports.api = functions.https.onRequest(app)