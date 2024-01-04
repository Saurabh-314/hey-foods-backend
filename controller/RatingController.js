import ratingModel from "../model/RatingModel.js";
import asyncErrorHandler from "../utils/AsyncErrorHandler.js";

export const register = asyncErrorHandler(async (req, res, next) => {
  req.body.userId = req.auth._id;
  const data = await ratingModel.create(req.body);
  res.status(201).json({
    message: "success",
    data: {
      data
    }
  })
})
export const restaurantRating = asyncErrorHandler(async (req, res, next) => {
  const data = await ratingModel.find({ restaurantId: req.params.id })
  res.status(201).json({
    message: "success",
    length: data.length,
    data: {
      data
    }
  })
})
export const itemRating = asyncErrorHandler(async (req, res, next) => {
  const data = await ratingModel.find({ itemId: req.params.id })
  res.status(201).json({
    message: "success",
    length: data.length,
    data: {
      data
    }
  })
})