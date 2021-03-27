const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const morgan = require('morgan')
const hbs = require('express-handlebars')
const path = require("path")
const flash = require('express-flash')
const session = require("express-session")

const app = express()
const port = process.env.PORT||3000

require('./passport/passport-config')(passport);

app.use(morgan('tiny'))

app.use(flash())
app.use(session({
    secret: 'somesecret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

//data
app.engine('hbs',hbs({ extname:"hbs", defaultLayout :'layout'}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/vanjadi",{ useNewUrlParser:true, useUnifiedTopology : true })

app.use("/", require("./routes/index"))

app.listen(port,(req,res)=> console.log(`App running at port ${port}`))