const mongoose = require("mongoose");
const userSchema = require("../models/userSchema");
const itemSchema = require("../models/itemSchema");

// function mainDB(url, _firstName, _lastName, _dbAdd) {
//   const setMainDb = mongoose
//     .createConnection(url)
//     .model("users", userSchema)
//     .create({ FirstName: _firstName, LastName: _lastName, dbAddress: _dbAdd });

//   const result = setMainDb.then((data) => {
//     console.log("data---> ", data);
//     return data;
//   });

//   return result;
// }

// function additionalDB(url, iNum, iName) {
//   const setAdditionalDb = mongoose
//     .createConnection(url)
//     .model("items", itemSchema)
//     .create({ itemNumber: iNum, itemName: iName });

//   return setAdditionalDb;
// }

// exports.mainDB = mainDB;
// exports.additionalDB = additionalDB;
