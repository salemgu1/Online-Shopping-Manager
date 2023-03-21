const express = require('express')
const Order = require('../models/order')
const User = require('../models/user')

const orderUtils = require("../utils/order_utils")


const router = express.Router()


router.post('/create',function (req,res) {
    let newUser = User({
        username: "salem gode",
        password: "1234",
        budget: 500
    })

    let orderInfo = req.body
    let newOrder = orderUtils.createOrder(newUser,orderInfo)
    res.send(newOrder)
})


module.exports = router