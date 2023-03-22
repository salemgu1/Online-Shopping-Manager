const express = require("express");
const { Schema } = require("mongoose");
const Order = require("../models/order");
const User = require("../models/user");
const router = express.Router();
const time = require("../utils/time");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const secretKey = "my_secret_key";

const orderUtils = require("../utils/order_utils");

router.get("/undeliverd", authenticateToken, async function (req, res) {
  try {
    const user = await findUser(req.user.id, req.user.username);
    console.log("request come");
    let orderForUserIDS = user[0].orders;
    getOrders(orderForUserIDS).then((result) => {
      let filteredOrders = result.map((order) => {
        return {
          id: order.id,
          shopLogo: order.shopLogo,
          days: time.getDatesDiff(order.orderDate, order.arrivalDate),
          dayesPassed: time.getPassedDays(order.orderDate),
          description: order.description,
      };
      });
      res.send(filteredOrders);
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Invalid token" });
  }
});

const getOrders = async function (ordersIds) {
  ordersObj = [];
  for (let i = 0; i < ordersIds.length; i++) {
    ordersObj.push(await Order.findById(ordersIds[i]));
  }
  return ordersObj;
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  // if the token is correct it gets from it the data we encurpt in it {id:2, username: lotemh}
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log("error");
      return res.sendStatus(401);
    }
    //defnie which user is this after token authentication
    req.user = user;
    next();
  });
}

function findUser(id, currentUsername) {
  return User.find({ username: currentUsername }).then((user) => {
    return user;
  });
}

router.post("/create", authenticateToken, async function (req, res) {
  const userObj = await findUser(req.user.id, req.user.username);
  console.log(userObj[0].username);
  let orderInfo = req.body;
  let newOrder = orderUtils.createOrder(orderInfo);
  let user = await User.findOneAndUpdate(
    { username: userObj[0].username },
    { $push: { orders: newOrder } },
    { new: true }
  );
  res.send(newOrder);
});

router.put("/update", function (req, res) {
  console.log(req.query.id);
  Order.findByIdAndUpdate(req.query.id, { isDelivered: true }).then(() =>
    res.end()
  );
});
router.get("/sort", function (req, res) {
  const sortBy = req.query.sort;
  if (sortBy == "app") {
    Order.find({})
      .sort({ shopName: -1 })
      .then((orders) => res.send(filterOrders(orders)));
  } else if (sortBy === "cost") {
    Order.find({})
      .sort({ orderPrice: -1 })
      .then((orders) => {
        res.send(filterOrders(orders));
      });
  } else if (sortBy == "date") {
    Order.find({})
      .sort({ arrivalDate: 1 })
      .then((orders) => res.send(filterOrders(orders)));
  }
})
function filterOrders(orders){
  let filteredOrders = orders.map((order) => {
    return {
      id: order.id,
      shopLogo: order.shopLogo,
      days: time.getDatesDiff(order.orderDate, order.arrivalDate),
      dayesPassed: time.getPassedDays(order.orderDate),
      description: order.description,
    };
  });
  return filteredOrders
}

module.exports = router;
