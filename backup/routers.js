const mongoose = require("mongoose");
const userSchema = require("../models/userSchema");
const itemSchema = require("../models/itemSchema");
module.exports = function (app) {
  // Find Item From User****************
  const findItemFromUsered = require("../controllers/findItemFromUser.controllers");
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

  // Save item & User*************** เช็ค User ซ้ำ --> Create Auth***
  const connectDB = require("../controllers/connectDB.controllers");
  app.post("/saveUserAndItem", async (req, res) => {
    // console.log("Body---> ", req.body);
    const _urlMain = "mongodb://localhost:27017/User";
    const _firstName = req.body.firstName;
    const _lastName = req.body.lastName;

    // sample
    // dbAddress--> "mongodb://localhost:27017/Item1" , "mongodb://localhost:27017/Item2" ,
    const _urlAdditional = req.body.dbAddress; // Create DB
    const _dbAddress = req.body.dbAddress; // Save to User / DB และใช้ Get ข้อมูลจาก DB นี้ จาก User
    const _itemNumber = req.body.itemNumber;
    const _itemName = req.body.itemName;

    try {
      // save User
      // Check User ซ้ำ
      const User = connectDB
        .mainDB(_urlMain, _firstName, _lastName, _dbAddress)
        .then((result) => {
          // save Item;
          connectDB.additionalDB(_urlAdditional, _itemNumber, _itemName);
          console.log("result-> ", result);
          res.send(result);
        });
    } catch (err) {
      res.send(err);
    }
  });

  // Save Item from find user ************** เช็ค User ซ้ำ --> Create Auth**
  const auth = require("../middleware/auth");

  app.post(
    "/saveUser",
    auth.checkDuplicateUsernameOrEmail,
    async (req, res, next) => {
      const _firstName = req.body.firstName;
      const _lastName = req.body.lastName;
      const _dbAddress = req.body.dbAddress;

      const uri = "mongodb://localhost:27017/User";

      // auth เช็ค user ซ้ำ
      // Next
      //==============
      // get dbAddress (item DB) from user
      // save data item DB
      try {
        const saveUser = await mongoose
          .createConnection(uri)
          .model("users", userSchema)
          .create({
            FirstName: _firstName,
            LastName: _lastName,
            dbAddress: _dbAddress,
          });
        //res.send("Save User data successed");
        res.send(saveUser);
      } catch (err) {
        res.send(err);
      }
    }
  );

  app.post("/saveItem", auth.checkUserTosaveItem, async (req, res, next) => {
    const _firstName = req.body.firstName;
    const _itemNumber = req.body.itemNumber;
    const _itemName = req.body.itemName;

    // find dbAddress from User
    const db2 = mongoose.createConnection("mongodb://localhost:27017/User");
    const User = db2.model("users", userSchema);
    const _user = await User.findOne({ FirstName: _firstName }).then(
      async (doc) => {
        console.log("doc data---> ", doc);

        if (!doc) {
          res.send("Please Register");
        } else {
          try {
            // save data
            const saveItem = await mongoose
              .createConnection(doc.dbAddress)
              .model("items", itemSchema)
              .create({
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
};
