import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const RatingSchema = mongoose.Schema({
  ratingId: {
    type: ObjectId,
    default: new ObjectId()
  },
  userId: {
    type: mongoose.ObjectId,
  },
  restaurantId: {
    type: mongoose.ObjectId,
  },
  rating: {
    type: Number,
    min: [1, "Rating must be 1 or above"],
    max: [5, "Rating must be 5 or below"]
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


const rating = mongoose.model("rating", RatingSchema);

export default rating;