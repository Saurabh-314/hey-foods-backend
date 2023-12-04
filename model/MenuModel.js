import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
const MenuSchema = mongoose.Schema({
  menuId: {
    type: ObjectId,
    default: new ObjectId()
  },
  restaurantId: {
    type: mongoose.ObjectId
  },
  name: String,
  iconUrl: String,
  createAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})


const menu = mongoose.model("menu", MenuSchema);

export default menu;