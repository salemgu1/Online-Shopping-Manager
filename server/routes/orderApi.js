const express = require('express')
const { Schema } = require('mongoose')
const Order = require('../models/order')
const User = require('../models/user')


const orderUtils = require("../utils/order_utils")


const router = express.Router()

router.get("/undeliverd", function (req, res) {
  Order.find({ isDelivered: false }).then((orders) => {
    let filteredOrders = orders.map((order) => {
      return {
        id: order.id,
        shopLogo: order.shopLogo,
        days: time.getDatesDiff(order.orderDate, order.arrivalDate),
        dayesPassed: time.getPassedDays(order.orderDate),
      };
    });
    res.send(filteredOrders);
  });
});

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

router.put('/update', function(req, res){
    const id = req.query.id
    console.log(id)
    Order.findByIdAndUpdate(id, {isDelivered: true}).then(function (err, order) {
        console.log(order)})
    res.end()
})

module.exports = router