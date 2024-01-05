import restaurantModel from "../model/RestaurantModel.js"
import userModel from "../model/UserModel.js"
import asyncErrorHandler from "../utils/AsyncErrorHandler.js"

export const profile = asyncErrorHandler(async (req, res, next) => {
  const data = await userModel.findById(req.auth._id)
  res.status(200).json({
    status: 'success',
    data: {
      data
    }
  })
})
export const profileUpdate = asyncErrorHandler(async (req, res, next) => {
  const data = await userModel.findByIdAndUpdate(req.auth._id, req.body, { new: true })
  res.status(200).json({
    status: 'success',
    data: {
      data
    }
  })
})

export const restaurantApproval = asyncErrorHandler(async (req, res, next) => {
  const data = await restaurantModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({
    status: 'success',
    data: {
      data
    }
  })
})