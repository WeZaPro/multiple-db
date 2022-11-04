const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./routes/routers")(app);

app.listen("5000", () => {
  console.log("server run port 5000");
});
