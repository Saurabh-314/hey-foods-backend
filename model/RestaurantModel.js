import mongoose from "mongoose";
import bcrypt from "bcrypt";

const ObjectId = mongoose.Types.ObjectId;

const RestaurantSchema = mongoose.Schema({
  restaurantId: {
    type: ObjectId,
    default: new ObjectId(),
  },
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
  createAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

RestaurantSchema.pre("save", async function (next) {
  // console.log("RestaurantSchema pre", this.password);
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

const restaurant = mongoose.model("restaurant", RestaurantSchema);

export default restaurant;