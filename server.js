const express = require('express')
const app = express()
const db = require('./connection')


app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))



const questionRouter = require("./routes/question")
const userRouter = require("./routes/user")

app.use("/questions", questionRouter)
app.use("/users", userRouter)

app.listen(3000)