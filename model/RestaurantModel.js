import mongoose from "mongoose";
let ObjectId = mongoose.Types.ObjectId;

const RestaurantSchema = mongoose.Schema({
  restaurantId: {
    type: ObjectId,
    default: new ObjectId(),
  },
  name: {
    type:String,
    required:[true,"Name is required field"],
  },
  email: {
    type: String,
    required:[true,"Email is required field"],
    unique: true
  },
  mobileNumber: {
    type: String,
    required:[true,"Number is required field"],
    unique: true
  },
  address: {
    type:String,
    required:[true,"Address is required field"],
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


const restaurant = mongoose.model("restaurant", RestaurantSchema);

export default restaurant;