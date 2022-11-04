const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  itemNumber: String,
  itemName: String,
});
module.exports = itemSchema;
