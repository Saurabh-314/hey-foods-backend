import mongoose from "mongoose";
import bcrypt from "bcrypt";

const RestaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required field"],
  },
  email: {
    type: String,
    required: [true, "Email is required field"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "password is required field"],
    select: false
  },
  mobileNumber: {
    type: String,
    required: [true, "Number is required field"],
    unique: true
  },
  address: {
    type: String,
    required: [true, "Address is required field"],
  },
  category: {
    type: String,
    enum: ["veg", "non-veg", "both"],
    required: [true, "Category is required field"],
  },
  approval: {
    type: String,
    enum: ["pending", "accept", "reject"],
    default: "pending"
  },
  otp: {
    type: String,
    select: false
  },
  token: {
    type: String,
    select: false
  }
},
  {
    timestamps: true
  }

)

RestaurantSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

const restaurant = mongoose.model("restaurant", RestaurantSchema);

export default restaurant;