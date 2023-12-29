import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = mongoose.Schema({
  userId: {
    type: ObjectId,
    default: new ObjectId(),
    ref:"address"
  },
  firstName: {
    type: String,
    required: [true, "First name is required field"],
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required field"],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "password is required field"],
    select: false
  },
  dob: {
    type: Date,
  },
  gender: String,
  mobileNumber: {
    type: String,
    required: [true, "Number is required field"],
    unique: true
  },
  deviceToken: String,
  role: {
    type: String,
    anum: ["user", "admin"],
    default: "user"
  },
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