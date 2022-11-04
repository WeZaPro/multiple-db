const mongoose = require("mongoose");
const connectionUser = require("../connection/connections");
const connectionItem = require("../connection/connections");

async function saveUser(firstName, lastName, dbAddress) {
  // const db2 = mongoose.createConnection("mongodb://localhost:27017/User");
  // const User = db2.model("users", userSchema);

  // Create Connection
  const User = connectionUser.CreateConnectUser(
    "mongodb://localhost:27017/User",
    "users"
  );

  // const _user = await User.findOne({ FirstName: name });
  const _user = await User.findOne({ FirstName: firstName }).then(
    async (doc) => {
      console.log("doc data-controller---> ", doc);
      try {
        if (!doc) {
          // save user
          const _user = await User.create({
            FirstName: firstName,
            LastName: lastName,
            dbAddress: dbAddress,
          });
          console.log("_user data---> ", _user);
          return _user;
        } else {
          return "Failed! Username is already in use!";
        }
      } catch (err) {
        return err;
      }
    }
  );

  return _user;
}
exports.saveUser = saveUser;
