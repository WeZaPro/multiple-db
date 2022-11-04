const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db1 = mongoose.createConnection(
  //   "mongodb+srv://taweesak9359:Taweesak5050@clusterbookingresturant.rm8iws9.mongodb.net/Name?retryWrites=true&w=majority"
  "mongodb://localhost:27017/Name"
);

const db2 = mongoose.createConnection(
  //   "mongodb+srv://taweesak9359:Taweesak5050@clusterbookingresturant.rm8iws9.mongodb.net/Email?retryWrites=true&w=majority"
  "mongodb://localhost:27017/Email"
);

const Name = db1.model("names", mongoose.Schema({ Name: String }));
const Email = db2.model("emails", mongoose.Schema({ Email: String }));

app.post("/", async (req, res) => {
  //   const name = await Name.create({ Name: "TEST2" });
  //   const email = await Email.create({ Email: "Email2@gmail.com" });

  const name = await Name.create({ Name: req.body.name });
  const email = await Email.create({ Email: req.body.email });

  if (name && email) {
    res.send("success");
  } else {
    res.send("failed");
  }
});

app.get("/name", async (req, res) => {
  const name = await Name.find({});
  console.log("Name---> ", name);

  if (name) {
    res.send({
      message: "success",
      name: name,
    });
  } else {
    res.send("failed");
  }
});

app.listen("5000", () => {
  console.log("server run port 5000");
});
