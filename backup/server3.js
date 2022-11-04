const express = require("express");
const userSchema = require("./userSchema");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen("5000", () => {
  console.log("server run port 5000");
});

function mainDB(url, data) {
  const setMainDb = mongoose
    .createConnection(url)
    .model("names", mongoose.Schema({ Name: String }))
    .create({ Name: data });

  return setMainDb;
}

function additionalDB(url, data) {
  const setAdditionalDb = mongoose
    .createConnection(url)
    .model("email", mongoose.Schema({ Email: String }))
    .create({ Email: data });

  return setAdditionalDb;
}

async function findAll() {
  const db2 = mongoose.createConnection("mongodb://localhost:27017/Email");

  const Email = db2.model("emails", mongoose.Schema({ Email: String }));
  const _email = await Email.find({});

  //console.log("data---> ", _email);
  return _email;
}

app.post("/", async (req, res) => {
  const _name = req.body.name;
  const _email = req.body.email;
  const _urlMain = "mongodb://localhost:27017/Name";
  const _urlAdditional = "mongodb://localhost:27017/Email";

  mainDB(_urlMain, _name);
  additionalDB(_urlAdditional, _email);

  if (_name && _email) {
    res.send("success");
  } else {
    res.send("failed");
  }
});

app.get("/", async (req, res) => {
  findAll().then((data) => {
    console.log("email-->000 ", data);
    return res.status(200).json({
      email: data.email,
    });
  });

  //res.json(email);
});
