const express = require('express')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const app = express()
const api = process.env.API_URL

var logStream = fs.createWriteStream(path.join(__dirname, 'logs.log'), {
  flags: 'a',
})

app.use(express.json())
app.use(morgan('tiny', { stream: logStream }))

app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: 'Hair Dye',
    image: 'some_url',
  }
  res.send(product)
})

app.post(`${api}/products`, (req, res) => {
  console.log(req.body)
  res.send('OKkk')
})

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
