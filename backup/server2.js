const express = require("express");
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
  // const name = await Name.create({ Name: req.body.name });
  // const email = await Email.create({ Email: req.body.email });

  // const name = mongoose
  //   .createConnection("mongodb://localhost:27017/Name")
  //   .model("names", mongoose.Schema({ Name: String }))
  //   .create({ Name: req.body.name });

  // const email = mongoose
  //   .createConnection("mongodb://localhost:27017/Email")
  //   .model("emails", mongoose.Schema({ Email: String }))
  //   .create({ Email: req.body.email });

  if (_name && _email) {
    res.send("success");
  } else {
    res.send("failed");
  }
});

app.get("/", async (req, res) => {
  const email = findAll().then((data) => {
    console.log("email-->000 ", data);
  });

  res.json(email);
});

// app.get("/name", async (req, res) => {
//   const name = await Name.find({});
//   console.log("Name---> ", name);

//   if (name) {
//     res.send({
//       message: "success",
//       name: name,
//     });
//   } else {
//     res.send("failed");
//   }
// });
