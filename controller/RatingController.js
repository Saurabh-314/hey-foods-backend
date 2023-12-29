import RatingModel from "../model/RatingModel.js";
import asyncErrorHandler from "../utils/AsyncErrorHandler.js";

export const register = asyncErrorHandler(async (req, res, next) => {
  const data = await RatingModel.create(req.body);
  res.status(201).json({
    message: "success",
    data: {
      data
    }
  })
})
export const restaurantRating = asyncErrorHandler(async (req, res, next) => {
  const data = await RatingModel.find({ restaurantId: req.params.id })
  res.status(201).json({
    message: "success",
    data: {
      data
    }
  })
})
export const itemRating = asyncErrorHandler(async (req, res, next) => {
  const data = await RatingModel.find({ itemId: req.params.id })
  res.status(201).json({
    message: "success",
    data: {
      data
    }
  })
})