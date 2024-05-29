const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      reqried: [true,'name is require'],
    },
    email: {
      type: String,
      reqried: [true,'email is require'],
    },
    password: {
      type: String,
      reqried: [true,'password is require'],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
