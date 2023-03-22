const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const secretKey = "my_secret_key";




const getUsers = function (users) {
  const usersArray = users.map((user) => user.toObject());
  return usersArray;
};

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
        const hashedPassword = bcrypt.hashSync(user.password, salt);
        user.password = hashedPassword
        // console.log(user.password);
        const savedUser = user.save();
        return res.status(201).json(savedUser);
      }
    }
  });
});



function authenticateUser(username, password) {
  return User.find({}).then((users, err) => {
    const usersArray = getUsers(users)
    const user = usersArray.find((u) => u.username === username);
    if (!user) {
      return null;
    }
    console.log(user.password,password);
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return null;
    }
    return { id: user.id, username: user.username };
  })
}

function generateAccessToken(user) {
  return jwt.sign(user, secretKey);
}



router.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  console.log(typeof password);
  const user = authenticateUser(username, password);
  user.then((user)=>{
    if (!user) {
      return res.status(401).send({ message: "Invalid username or password" });
    }
    const accessToken = generateAccessToken(user);
    res.send({ accessToken });
  })
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


module.exports = router;
