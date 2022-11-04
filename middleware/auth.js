const mongoose = require("mongoose");
const userSchema = require("../models/userSchema");
const itemSchema = require("../models/itemSchema");

const myLogger = function (req, res, next) {
  console.log("LOGGED");
  next();
};

checkDuplicateUsernameOrEmail = (req, res, next) => {
  const db2 = mongoose.createConnection("mongodb://localhost:27017/User");
  const User = db2.model("users", userSchema);
  // Username
  User.findOne({
    FirstName: req.body.firstName,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    next();
  });
};

checkUserTosaveItem = (req, res, next) => {
  const db2 = mongoose.createConnection("mongodb://localhost:27017/User");
  const User = db2.model("users", userSchema);
  // Username
  User.findOne({
    FirstName: req.body.firstName,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      res.status(400).send({ message: "Failed! Username is not found!" });
      return;
    }

    next();
  });
};

exports.myLogger = myLogger;
exports.checkDuplicateUsernameOrEmail = checkDuplicateUsernameOrEmail;
exports.checkUserTosaveItem = checkUserTosaveItem;
