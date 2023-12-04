import mongoose from "mongoose";

const RatingSchema = mongoose.Schema({
  ratingId: {
    type: mongoose.ObjectId,
  },
  userId: {
    type: mongoose.ObjectId,
  },
  restaurantId: {
    type: mongoose.ObjectId,
  },
  rating: String,
  createAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})


const rating = mongoose.model("rating", RatingSchema);

export default rating;