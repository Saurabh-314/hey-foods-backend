import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  productId: {
    type: mongoose.ObjectId,
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


const product = mongoose.model("product", ProductSchema);

export default product;