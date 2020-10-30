const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const url = process.env.DATA_CONNECTION
const PORT = 4525
const  app = express()
const CodeLab = require('./Router/router')

mongoose.connect(url, {useNewUrlParser: true}, ()=>{
  console.log(`Server is connected Online`)
})

const con = mongoose.connection

app.use(express.json())
app.use('/', CodeLab)

app.listen(PORT, ()=>{
  console.log(`${PORT} `)
} )