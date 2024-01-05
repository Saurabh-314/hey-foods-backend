import addressModel from "../model/AddressModel.js";
import OrderModel from "../model/OrderModel.js";
import asyncErrorHandler from "../utils/AsyncErrorHandler.js";

export const register = asyncErrorHandler(async (req, res) => {
  const address = await addressModel.findById(req.body.addressId) // if user have multiple address

  req.body.userId = req.auth._id;
  req.body.deliveryAddress = address;

  const data = await OrderModel.create(req.body);
  res.status(201).json({
    message: "success",
    data: {
      data
    }
  })
})

export const getOrderById = asyncErrorHandler(async (req, res) => {
  const data = await OrderModel.findById(req.params.id);
  res.status(201).json({
    message: "success",
    data: {
      data
    }
  })
})