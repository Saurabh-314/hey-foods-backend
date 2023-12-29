import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const ItemSchema = mongoose.Schema({
  itemId: {
    type: ObjectId,
    default: new ObjectId()
  },
  menuId: {
    type: mongoose.ObjectId,
  },
  restaurantId: {
    type: mongoose.ObjectId,
  },
  name: {
    type:String,
    required:[true,"Name is required field"],
  },
  imageUrl: String,
  price: mongoose.Schema.Types.Decimal128,
  createAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})


const item = mongoose.model("item", ItemSchema);

export default item;