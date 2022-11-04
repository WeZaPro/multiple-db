const mongoose = require("mongoose");
const userSchema = require("../models/userSchema");
const itemSchema = require("../models/itemSchema");

// test get module connectiom
const connectionUser = require("../connection/connections");
const connectionItem = require("../connection/connections");
const findItemFromUsered = require("../controllers/findItemFromUser.controllers");
const saveUserData = require("../controllers/saveUser.controllers");
const auth = require("../middleware/auth");

module.exports = function (app) {
  // Find Item From User****************

  // path นี้เรียก Connection จาก Controller
  app.get("/findItem", async (req, res) => {
    const name = req.body.firstName;
    console.log("User-->usersFunc ", name);
    try {
      await findItemFromUsered.findItemFromUser(name).then((data) => {
        console.log("User-->000 ", data);
        return res.status(200).send({
          data,
        });
      });
    } catch (err) {
      return res.send(err);
    }
  });

  // path นี้เรียก Connection จาก Routers **** แก้ไข Connect ที่ Controller>>>>>>>>>>>>>>>>
  // app.post(
  //   "/saveUser",
  //   auth.checkDuplicateUsernameOrEmail,
  //   async (req, res, next) => {
  //     const _firstName = req.body.firstName;
  //     const _lastName = req.body.lastName;
  //     const _dbAddress = req.body.dbAddress;

  //     const uri = "mongodb://localhost:27017/User";
  //     try {
  //       const saveUser = await mongoose
  //         .createConnection(uri)
  //         .model("users", userSchema)
  //         .create({
  //           FirstName: _firstName,
  //           LastName: _lastName,
  //           dbAddress: _dbAddress,
  //         });

  //       res.send(saveUser);
  //     } catch (err) {
  //       res.send(err);
  //     }
  //   }
  // );

  // path นี้เรียก Connection จาก Routers **** แก้ไข Connect ที่ Controller>>>>>>>>>>>>>>>>
  app.post("/saveItem", auth.checkUserTosaveItem, async (req, res, next) => {
    const _firstName = req.body.firstName;
    const _itemNumber = req.body.itemNumber;
    const _itemName = req.body.itemName;

    const User = connectionUser.CreateConnectUser(
      "mongodb://localhost:27017/User",
      "users"
    );

    const _user = await User.findOne({ FirstName: _firstName }).then(
      async (doc) => {
        console.log("doc data---> ", doc);

        if (!doc) {
          res.send("Please Register");
        } else {
          try {
            // save data
            const Item = connectionItem.CreateConnectItem(
              doc.dbAddress,
              "items"
            );

            const saveItem = await Item.create({
              itemNumber: _itemNumber,
              itemName: _itemName,
            });
            //res.send("Save User data successed");
            res.send(saveItem);
          } catch (err) {
            res.send(err);
          }
        }
      }
    );
  });

  //========== Connect data from controller
  app.post(
    "/saveUserTest",
    auth.checkDuplicateUsernameOrEmail,
    async (req, res, next) => {
      const _firstName = req.body.firstName;
      const _lastName = req.body.lastName;
      const _dbAddress = req.body.dbAddress;

      try {
        await saveUserData
          .saveUser(_firstName, _lastName, _dbAddress)
          .then((data) => {
            console.log("User-->000 ", data);
            return res.status(200).send({
              data,
            });
          });
      } catch (err) {
        return res.send(err);
      }
    }
  );
};
