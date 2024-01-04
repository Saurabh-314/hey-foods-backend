import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
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
    enum: ["user", "admin"],
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

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

const user = mongoose.model("user", UserSchema);

export default user;