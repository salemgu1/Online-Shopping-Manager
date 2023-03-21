
const express = require('express')
const userApi = require('./server/routes/userApi')
const path = require('path')
const axios = require("axios");

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(express.static(path.join(__dirname, 'dist')))


app.use('/',userApi)


const port = 3000
app.listen(port, function () {
    console.log(`Server running on ${port}`)
})
