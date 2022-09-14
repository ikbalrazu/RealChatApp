const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      picture: {
        type: String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
    },
    { timestamps: true }
  );
  
  const UserModel = mongoose.model("Users", UserSchema);
  module.exports = UserModel;