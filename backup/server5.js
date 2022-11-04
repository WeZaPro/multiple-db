const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userSchema = require("./userSchema");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen("5000", () => {
  console.log("server run port 5000");
});

function mainDB(url, _firstName, _lastName) {
  const setMainDb = mongoose
    .createConnection(url)
    .model("names", mongoose.Schema({ FirstName: String, LastName: String }))

    .create({ FirstName: _firstName, LastName: _lastName });

  const result = setMainDb.then((data) => {
    console.log("data---> ", data);
    return data;
  });

  return result;
}

function additionalDB(url, data) {
  const setAdditionalDb = mongoose
    .createConnection(url)
    .model("emails", mongoose.Schema({ Email: String }))
    // .model("email", mongoose.Schema({ Email: String }))

    .create({ Email: data });

  return setAdditionalDb;
}

async function findAll(uri) {
  // const db2 = mongoose.createConnection("mongodb://localhost:27017/Email");
  const db2 = mongoose.createConnection(uri);

  const Email = db2.model("emails", mongoose.Schema({ Email: String }));
  const _email = await Email.find({});

  //console.log("data---> ", _email);
  // return _email;
  return _email;
}

app.post("/", async (req, res) => {
  // console.log("Body---> ", req.body);
  const _firstName = req.body.firstName;
  const _lastName = req.body.lastName;
  const _email = req.body.email;
  const _urlMain = "mongodb://localhost:27017/Name";
  const _urlAdditional = "mongodb://localhost:27017/Email";

  //mainDB(_urlMain, _name);
  additionalDB(_urlAdditional, _email);

  try {
    const a = mainDB(_urlMain, _firstName, _lastName).then((result) => {
      console.log("result-> ", result);
      res.send(result);
    });
  } catch (err) {
    res.send(err);
  }

  // const a = mainDB(_urlMain, _name).then((result) => {
  //   console.log("result-> ", result);
  //   res.send(result);
  // });

  // if (_name && _email) {
  //   res.send("success");
  // } else {
  //   res.send("failed");
  // }
});

app.get("/", async (req, res) => {
  // 1-> get token -> get user+email
  // 2-> Find user -> DbAddress Field -> uri
  const uri = "mongodb://localhost:27017/Email";
  findAll(uri).then((data) => {
    console.log("email-->000 ", data);
    return res.status(200).send({
      //email: data.email,
      data,
    });
  });

  //res.json(email);
});
