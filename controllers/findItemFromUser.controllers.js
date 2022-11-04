const mongoose = require("mongoose");
// const userSchema = require("../models/userSchema");
// const itemSchema = require("../models/itemSchema");
const connectionUser = require("../connection/connections");
const connectionItem = require("../connection/connections");

async function findItemFromUser(name) {
  // const db2 = mongoose.createConnection("mongodb://localhost:27017/User");
  // const User = db2.model("users", userSchema);

  // Create Connection
  const User = connectionUser.CreateConnectUser(
    "mongodb://localhost:27017/User",
    "users"
  );

  // const _user = await User.findOne({ FirstName: name });
  const _user = await User.findOne({ FirstName: name }).then(async (doc) => {
    console.log("doc data-controller---> ", doc);
    try {
      if (!doc) {
        return "No User";
      } else {
        // const db2 = mongoose.createConnection(doc.dbAddress);
        // const Item = db2.model("items", itemSchema);

        const Item = connectionItem.CreateConnectItem(doc.dbAddress, "items");
        const _item = await Item.find({});
        console.log("_item data---> ", _item);
        return _item;
      }
    } catch (err) {
      return err;
    }
  });

  return _user;
}
exports.findItemFromUser = findItemFromUser;

// Find user ถ้าไม่ซ้ำให้ Save Item
// async function findUserAndSaveItem(name) {
//   const db2 = mongoose.createConnection("mongodb://localhost:27017/User");

//   const User = db2.model("users", userSchema);
//   // const _user = await User.findOne({ FirstName: name });
//   const _user = await User.findOne({ FirstName: name }).then(async (doc) => {
//     console.log("doc data---> ", doc.dbAddress);

//     const db2 = mongoose.createConnection(doc.dbAddress);
//     const Item = db2.model("items", itemSchema);
//     const _item = await Item.find({});
//     console.log("_item data---> ", _item);
//     return _item;
//   });

//   return _user;
// }

// exports.findUserAndSaveItem = findUserAndSaveItem;
