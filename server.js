require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const morgan = require('morgan')
const hbs = require('express-handlebars')
const path = require("path")
const flash = require('express-flash')
const session = require("express-session")
const cors = require("cors")
const handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const app = express()
const port = process.env.PORT || 3000

require('./passport/passport-config')(passport);

app.use(morgan('tiny'))

app.use(cors())
app.use(flash())
app.use(session({
    secret: 'somesecret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
//data
app.engine('hbs', hbs({
    extname: "hbs",
    defaultLayout: 'layout',
    handlebars: allowInsecurePrototypeAccess(handlebars),
    helpers: require("./helper/hadleBarsHelper"),
    moment:require('helper-moment')
}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/", require("./routes/index"))

mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
    console.log("Db Connected");
    app.listen(port, (req, res) => console.log(`App running at port ${port}`))
})