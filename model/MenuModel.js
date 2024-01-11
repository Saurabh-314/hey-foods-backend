import mongoose, { Schema } from "mongoose";


const MenuSchema = Schema({
  restaurantId: {
    type: Schema.Types.ObjectId,
    required: [true, "Restaurant ID is required field"],
  },
  name: {
    type: String,
    enum: ["veg", "non-veg", "both"],
    required: [true, "Name is required field"],
  },
  iconUrl: String,
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


const menu = mongoose.model("menu", MenuSchema);

export default menu;