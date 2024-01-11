import mongoose, { Schema } from "mongoose";

const ItemSchema = Schema({
  menuId: {
    type: Schema.Types.ObjectId,
    ref: "menu"
  },
  restaurantId: {
    type: mongoose.ObjectId,
  },
  name: {
    type: String,
    required: [true, "Name is required field"],
  },
  imageUrl: String,
  price: Schema.Types.Decimal128,
  isVerified: {
    type: Boolean,
    enum: [true, false],
    default: false
  },
},
  {
    timestamps: true
  }
)


const item = mongoose.model("item", ItemSchema);

export default item;