import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  userId: {
    // type: mongoose.types.ObjectId,
    type: mongoose.ObjectId,
  },
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  dob: {
    type: Date,
  },
  gender: String,
  mobileNumber: {
    type: String,
    unique: true
  },
  deviceToken: String,
  createAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

const user = mongoose.model("user", UserSchema);

export default user;