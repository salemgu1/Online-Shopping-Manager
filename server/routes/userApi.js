const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require("axios");
router.use(bodyParser.urlencoded({ extended: true }));
const User = require("../models/user");




module.exports = router;
