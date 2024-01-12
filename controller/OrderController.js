import addressModel from "../model/AddressModel.js";
import orderModel from "../model/OrderModel.js";
import asyncErrorHandler from "../utils/AsyncErrorHandler.js";
import CustomeError from "../utils/CustomError.js";

export const register = asyncErrorHandler(async (req, res, next) => {
  const address = await addressModel.findById(req.body.addressId) // if user have multiple address

  if (!address) {
    const error = new CustomeError("Address not found, please Enter address ID", 404);
    return next(error)
  }

  req.body.userId = req.auth._id;
  req.body.deliveryAddress = address;

  const data = await orderModel.create(req.body);
  res.status(201).json({
    message: "success",
    data: {
      data
    }
  })
})

export const getOrderById = asyncErrorHandler(async (req, res) => {
  const data = await orderModel.findById(req.params.id);

  if (!data) {
    const error = new CustomeError("Order not found, please enter valid ID", 404);
    return next(error)
  }
  res.status(201).json({
    message: "success",
    data: {
      data
    }
  })
})