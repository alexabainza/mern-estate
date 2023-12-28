import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, //can't add to database until this has a value
      unique: true, //can't be repeated
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
  },
  { timestamps: true }
);

//creating the model
const User = mongoose.model('User', userSchema)

export default User;