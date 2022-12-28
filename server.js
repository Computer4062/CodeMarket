const express =  require('express')
const mongoose = require('mongoose')
const code = require('./routes/code.js')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const codes = require('./model/codes.js')
const register = require('./routes/Register.js')
const Accounts = require('./model/Accounts.js')
const stripe = require('stripe')
require('dotenv').config()
const querystring = require('querystring')
const path = require("path")
const Comments = require("./model/Comments")
const CommentC = require("./routes/Comments")

mongoose.connect("mongodb+srv://CodeMarket:codemarketccodemarket@cluster0.sugg1ez.mongodb.net/codemarket?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan("dev"))

app.get("/products/:id", async(req, res) => {
    try{
        const product = await codes.find({_id: req.params.id})
        res.status(200).send(product)
    }catch(error){
        res.status(404).send(error)
    }
})

app.get("/found/:category", async(req, res) => {
    try{
        const product = await codes.find({category: req.params.category})
        res.status(200).send(product)
    }catch(error){
        res.status(404).send(error)
    }
})

app.get("/found/name/:category", async(req, res) => {
    try{
        const product = await codes.find({username: req.params.category})
        res.status(200).send(product)
    }catch(error){
        res.status(404).send(error)
    }
})

app.get("/acc/find/:username/:password", async(req, res) => {
    try{
        const acc = await Accounts.find({username: req.params.username}, {userpassword: req.params.password})
        res.status(200).send(acc)
    }catch(error){
        res.status(404).send("Account was not found")
        console.log(error)
    }
})

app.get("/comment/find/:name", async(req, res) => {
    try{
        const comments = await Comments.find({name: req.params.name})
        res.status(200).send(comments)
    }catch(error){
        res.status(404).send(error)
    }
})

app.post('/pay', async (req, res) => {
    const html = req.body.html
    const css = req.body.css
    const js = req.body.js
	const Stripe = stripe(req.body.APIkey)
    const url = "https://codemarket.onrender.com/payment/success" + querystring.stringify({query:`/${html}/${css}/${js}`})
    const session = await Stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                image: req.body.image,
                name: req.body.name
              },
              unit_amount: req.body.price * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: url,
        cancel_url: "http://codemarket.onrender.com/payment/cancel"
      });
      res.send(session.url)
});

app.use('/code', code)
app.use('/acc', register)
app.use('/comment', CommentC)

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(5000)