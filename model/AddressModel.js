import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const AddressSchema = mongoose.Schema({
  addressId: {
    type: ObjectId,
    default: new ObjectId(),
    ref: "user"
  },
  userId: {
    type: mongoose.ObjectId,
    ref: "user"
  },
  country: {
    type: String,
    default: "India"
  },
  state: {
    type: String,
    required: [true, "State is required field"],
  },
  city: {
    type: String,
    required: [true, "City is required field"],
  },
  street: {
    type: String,
    required: [true, "Street is required field"],
  },
  pincode: {
    type: String,
    required: [true, "Pincode is required field"],
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


const address = mongoose.model("address", AddressSchema);

export default address;