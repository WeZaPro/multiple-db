const mongoose = require("mongoose");
const userSchema = require("../models/userSchema");
const itemSchema = require("../models/itemSchema");

// 1. Check user ว่ามีหรือไม่
// 2. ถ้ามี Get dbAddress จาก User data
// 3. find data from dbAddress
saveItem = async (req, res, next) => {};

exports.saveItem = saveItem;
