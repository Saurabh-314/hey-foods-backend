import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
  role: {
    type: String,
    enum: ["user", "admin", "delivery"],
    default: "user"
  },
  otp: {
    type: String,
    default: "",
    select: false
  },
  deviceToken: String,
  token: {
    type: String,
    select: false
  },
},
  {
    timestamps: true
  }
)

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified('password')) return next();

//   const salt = await bcrypt.genSalt(10);
//   this._update.password = await bcrypt.hash(this._update.password, salt);
//   next();
// })

// UserSchema.pre("findOneAndUpdate", async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   if (this._update.password) {
//     this._update.password = await bcrypt.hash(this._update.password, salt);
//   }
//   next();
// })

const user = mongoose.model("user", UserSchema);

export default user;