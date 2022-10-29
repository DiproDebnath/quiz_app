const express = require('express')
const app = express()
const db = require('./connection')


app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))



const questionRouter = require("./routes/question")

app.use("/question", questionRouter)

app.listen(3000)