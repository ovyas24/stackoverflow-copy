const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT||3000
const morgan = require('morgan')


app.use(morgan('tiny'))

//data
app.use(express.json())

let views = 0

mongoose.connect("mongodb://127.0.0.1:27017/vanjadi",{ useNewUrlParser:true, useUnifiedTopology : true })

app.get('/',(req,res)=>{
    views += 1
    res.send(`Views : ${views}`)
})

app.use("/questions",require("./routes/question"))

app.listen(port,(req,res)=> console.log(`App running at port ${port}`))