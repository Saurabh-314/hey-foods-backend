import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const OrderSchema = mongoose.Schema({
  orderId: {
    type: ObjectId,
    default: new ObjectId()
  },
  userId: {
    type: mongoose.ObjectId,
  },
  restaurantId: {
    type: mongoose.ObjectId,
  },
  orderTotal: mongoose.Schema.Types.Decimal128,
  // orderTotal: String,
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


const order = mongoose.model("order", OrderSchema);

export default order;