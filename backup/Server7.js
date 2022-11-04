const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userSchema = require("./models/userSchema");
const itemSchema = require("./models/itemSchema");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen("5000", () => {
  console.log("server run port 5000");
});

// ----------------function------------------------

function mainDB(url, _firstName, _lastName, _dbAdd) {
  const setMainDb = mongoose
    .createConnection(url)
    .model("users", userSchema)
    .create({ FirstName: _firstName, LastName: _lastName, dbAddress: _dbAdd });

  const result = setMainDb.then((data) => {
    console.log("data---> ", data);
    return data;
  });

  return result;
}

function additionalDB(url, iNum, iName) {
  const setAdditionalDb = mongoose
    .createConnection(url)
    .model("items", itemSchema)
    // .model("email", mongoose.Schema({ Email: String }))

    .create({ itemNumber: iNum, itemName: iName });

  return setAdditionalDb;
}

async function findAll(uri) {
  const db2 = mongoose.createConnection(uri);

  const Item = db2.model("items", itemSchema);
  const _item = await Item.find({});

  return _item;
}

async function findUser(name) {
  const db2 = mongoose.createConnection("mongodb://localhost:27017/User");

  const User = db2.model("users", userSchema);
  // const _user = await User.findOne({ FirstName: name });
  const _user = await User.findOne({ FirstName: name }).then(async (doc) => {
    console.log("doc data---> ", doc.dbAddress);

    const db2 = mongoose.createConnection(doc.dbAddress);
    const Item = db2.model("items", itemSchema);
    const _item = await Item.find({});
    console.log("_item data---> ", _item);
    return _item;
  });

  // console.log("adAddress data---> ", _user.dbAddress);
  return _user;
}

//---------Router---------------------------
app.post("/", async (req, res) => {
  // console.log("Body---> ", req.body);
  const _urlMain = "mongodb://localhost:27017/User";
  const _firstName = req.body.firstName;
  const _lastName = req.body.lastName;

  const _urlAdditional = req.body.dbAddress;
  const _itemNumber = req.body.itemNumber;
  const _itemName = req.body.itemName;
  const _dbAddress = req.body.dbAddress;

  //Item;
  additionalDB(_urlAdditional, _itemNumber, _itemName);

  try {
    // User
    const User = mainDB(_urlMain, _firstName, _lastName, _dbAddress).then(
      (result) => {
        console.log("result-> ", result);
        res.send(result);
      }
    );
  } catch (err) {
    res.send(err);
  }
});

app.get("/", async (req, res) => {
  // 1-> get token -> get user+email
  // 2-> Find user -> DbAddress Field -> uri
  const uri = req.body.db;
  findAll(uri).then((data) => {
    console.log("User-->000 ", data);
    return res.status(200).send({
      //email: data.email,
      data,
    });
  });
});

app.get("/users", async (req, res) => {
  // 1-> get token -> get user+email
  // 2-> Find user -> DbAddress Field -> uri
  const name = req.body.firstName;
  findUser(name).then((data) => {
    console.log("User-->000 ", data);
    return res.status(200).send({
      //email: data.email,
      data,
    });
  });
});
