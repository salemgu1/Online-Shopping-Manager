const express = require("express");
const router = express.Router();
const User = require("../models/user");



router.post("/user", (req, res) => {
  const user = new User(req.body);
  User.find({}).then((users, err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const usersArray = getUsers(users);
      if (existUser(usersArray, user.username) || user.username === "") {
        return res.status(401).send(`invalid username '${user.username}'`);
      } else {
        const savedUser = user.save();
        return res.status(201).json(savedUser);
      }
    }
  });
});

const existUser = function (usersArray, username) {
  let flag = false;
  const findUser = usersArray.find((user) => {
    if (user.username === username) {
      flag = true;
    }
  });

  return flag;
};

const getUsers = function (users) {
  const usersArray = users.map((user) => user.toObject());
  return usersArray;
};

module.exports = router;
