const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  confirmpassword: String,
  fullname:String,
  email: String,
  role: String,
});
module.exports = model("Users", userSchema);
