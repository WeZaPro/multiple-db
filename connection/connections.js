const mongoose = require("mongoose");
const userSchema = require("../models/userSchema");
const itemSchema = require("../models/itemSchema");

function CreateConnectUser(uri, collection) {
  const db2 = mongoose.createConnection(uri);
  const User = db2.model(collection, userSchema);
  return User;
}

function CreateConnectItem(uri, collection) {
  const db2 = mongoose.createConnection(uri);
  const Item = db2.model(collection, itemSchema);
  return Item;
}

exports.CreateConnectUser = CreateConnectUser;
exports.CreateConnectItem = CreateConnectItem;
