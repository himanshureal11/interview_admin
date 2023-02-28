const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password : {
    type: String,
    required: true,
  },
  access_level: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true, 
  },
  subject_id: {
    type: String,
  },
  subject_name: {
    type: String
  },
  mobile: {
    type: String
  },
  user_profile_pic_path : {
    type: String
  },
  user_profile_pic_with_government_id_path : {
    type: String
  },
},{timestamps: true});

const User = mongoose.model("User", UserSchema);

module.exports = User;

