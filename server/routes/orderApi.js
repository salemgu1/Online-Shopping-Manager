const express = require("express");
const { Schema } = require("mongoose");
const Order = require("../models/order");
const User = require("../models/user");
const router = express.Router();
const time = require("../utils/time");
const mongoose = require("mongoose");


const orderUtils = require("../utils/order_utils");

router.get("/undeliverd", function (req, res) {
  console.log("request come");
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



router.post("/create", async function (req, res) {
  let orderInfo = req.body;
  let newOrder = orderUtils.createOrder(orderInfo);
  let user = await User.findOneAndUpdate({ username: 'salem' } , { "$push": { "orders": newOrder } }, {new: true})
  res.send(user)
});

router.put("/update", function (req, res) {
  console.log(req.query.id);
  Order.findByIdAndUpdate(req.query.id, { isDelivered: true }).then(()=> res.end())

});
router.get("/sort", function(req, res){
  const sortBy = req.query.sort
  if(sortBy == "app"){
    Order.find({}).sort({shopName: -1}).then(orders => res.send(filterOrders(orders)))
  }
  else if(sortBy === "cost"){
    Order.find({}).sort({orderPrice: -1}).then(orders => {
      res.send(filterOrders(orders))
    })
  }
  else if(sortBy == 'date'){
    Order.find({}).sort({arrivalDate: 1}).then(orders => res.send(filterOrders(orders)))
  }
})
function filterOrders(orders){
  let filteredOrders = orders.map((order) => {
    return {
      id: order.id,
      shopLogo: order.shopLogo,
      days: time.getDatesDiff(order.orderDate, order.arrivalDate),
      dayesPassed: time.getPassedDays(order.orderDate),
    };
  });
  return filteredOrders
}

module.exports = router;
