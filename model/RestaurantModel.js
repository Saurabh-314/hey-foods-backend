import mongoose from "mongoose";
let ObjectId = mongoose.Types.ObjectId;

const RestaurantSchema = mongoose.Schema({
  restaurantId: {
    type: ObjectId,
    default: new ObjectId(),
  },
  name: String,
  email: {
    type: String,
    unique: true
  },
  mobileNumber: {
    type: String,
    unique: true
  },
  address: String,
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