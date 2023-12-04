import mongoose from "mongoose";
let ObjectId = mongoose.Types.ObjectId;

const AddressSchema = mongoose.Schema({
  addressId: {
    type: ObjectId,
    default: new ObjectId(),
  },
  userId: {
    type: mongoose.ObjectId,
  },
  country: {
    type: String,
    default: "India"
  },
  state: String,
  city: String,
  street: String,
  pincode: String,
  createAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})


const address = mongoose.model("address", AddressSchema);

export default address;