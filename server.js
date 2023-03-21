
const express = require('express')
const userApi = require('./server/routes/userApi')
const orderApi = require('./server/routes/orderApi')
const path = require('path')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use(express.static(path.join(__dirname, 'dist')))
    

app.use('/user',userApi)
app.use('/order',orderApi)

const port = 3000
app.listen(port, function () {
    console.log(`Server running on ${port}`)
})
