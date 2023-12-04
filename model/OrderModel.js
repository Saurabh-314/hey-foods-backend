import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
  orderId: {
    type: mongoose.ObjectId,
  },
  userId: {
    type: mongoose.ObjectId,
  },
  restaurantId: {
    type: mongoose.ObjectId,
  },
  orderTotal: decimal,
  deliveryStatus: String,
  createAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})


const order = mongoose.model("user", OrderSchema);

export default order;