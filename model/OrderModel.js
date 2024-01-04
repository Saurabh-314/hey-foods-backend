import mongoose, { Schema } from "mongoose";

const OrderSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  restaurantId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  itemId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  orderTotal: {
    type: Schema.Types.Decimal128,
    required: true
  },
  deliveryStatus: {
    type: String,
    enum: ["pending", "reject", "done"],
    default: "pending"
  },
  deliveryAddress: {
    country: String,
    state: String,
    city: String,
    street: String,
    landmark: String,
    pincode: String,
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


const order = mongoose.model("order", OrderSchema);

export default order;