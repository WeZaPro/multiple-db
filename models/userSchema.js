const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  FirstName: String,
  LastName: String,
  dbAddress: String,
});
module.exports = userSchema;

// const emailSchema = new mongoose.Schema({
//   Email: String,
// });
// export default userSchema;

// module.exports = { userSchema, emailSchema };
