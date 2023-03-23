const express = require("express");
const { Schema } = require("mongoose");
const Order = require("../models/order");
const User = require("../models/user");
const router = express.Router();
const time = require("../utils/time");
const budgetUtils = require("../utils/budget_utils");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const secretKey = "my_secret_key";

const orderUtils = require("../utils/order_utils");

router.get("/undeliverd", authenticateToken, async function (req, res) {
  try {
    const user = await findUser(req.user.id, req.user.username);

    let orderForUserIDS = user[0].orders;
    
    getOrders(orderForUserIDS).then((result) => {
      let filteredOrders = result.map((order) => {
        return {
          id: order.id,
          shopLogo: order.shopLogo,
          days: time.getDatesDiff(order.orderDate, order.arrivalDate),
          dayesPassed: time.getPassedDays(order.orderDate),
          description: order.description,
          isDelivered: order.isDelivered,
        };
      });
      filteredOrders = filteredOrders.filter(o => o.isDelivered == false)
      res.send({ username: user[0].username, orders: filteredOrders });
    });
  } catch (error) {

    res.status(401).send({ message: "Invalid token" });
  }
});


router.get("/budget", authenticateToken, async function (req, res) {
  try {
    const user = await findUser(req.user.id, req.user.username);
    console.log("request come fro bahjat");
    let orderForUserIDS = user[0].orders;
    
    getOrders(orderForUserIDS).then((result) => {
      let filteredOrders = result.map((order) => {
        return {
          id: order.id,
          shopLogo: order.shopLogo,
          days: time.getDatesDiff(order.orderDate, order.arrivalDate),
          dayesPassed: time.getPassedDays(order.orderDate),
          description: order.description,
          isDelivered: order.isDelivered,
        };
      });
      filteredOrders = filteredOrders.filter(o => o.isDelivered == false)
      res.send({ budget: user[0].budget });
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

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {

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

  let orderInfo = req.body;
  let newOrder = orderUtils.createOrder(orderInfo);
  let user = await User.findOneAndUpdate(
    { username: userObj[0].username },
    { $push: { orders: newOrder } },
    { new: true }
  );
  budgetUtils.budgetDecrement(user,newOrder)
  res.send(user);
});

router.put("/update", function (req, res) {

  Order.findByIdAndUpdate(req.query.id, { isDelivered: true }).then(() =>
    res.end()
  );
});
router.get("/sort", authenticateToken , async function (req, res) {
  const sortBy = req.query.sort;
  const user = await findUser(req.user.id, req.user.username);
  let orderForUserIDS = user[0].orders;
  if (sortBy == "app") {
    getOrders(orderForUserIDS)
    .then((orders) => {
      orders = orders.sort(function (a, b) {
        if (a.shopName.toLowerCase() < b.shopName.toLowerCase()) {
          return -1;
        }
        if (a.shopName.toLowerCase() > b.shopName.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      res.send(filterOrders(orders))
    })
  } else if (sortBy === "cost") {
    getOrders(orderForUserIDS)
      .then((orders) => {
        orders = orders.sort((a,b) => a.orderPrice - b.orderPrice)
        res.send(filterOrders(orders))
      })
  } else if (sortBy == "date") {
    getOrders(orderForUserIDS)
      .then((orders) => {
        orders = orders.sort((a,b) => new Date(a.arrivalDate) - new Date(b.arrivalDate))
        res.send(filterOrders(orders))
      })
  }
});
function filterOrders(orders) {
  let filteredOrders = orders.map((order) => {
    return {
      id: order.id,
      shopLogo: order.shopLogo,
      days: time.getDatesDiff(order.orderDate, order.arrivalDate),
      dayesPassed: time.getPassedDays(order.orderDate),
      description: order.description,
      isDelivered: order.isDelivered,
      orderPrice: order.orderPrice,
      shopName: order.shopName
    };
  });
  filteredOrders = filteredOrders.filter(o => o.isDelivered == false)

  return filteredOrders;
}

module.exports = router;
