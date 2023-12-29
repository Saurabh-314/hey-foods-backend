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
  itemId: {
    type: mongoose.ObjectId
  },
  orderTotal: mongoose.Schema.Types.Decimal128,
  // orderTotal: String,
  deliveryStatus: {
    type: String,
    anum: ["panding", "reject", "done"],
    default: "pending"
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