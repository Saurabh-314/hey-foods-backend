import addressModel from "../model/AddressModel.js";
import asyncErrorHandler from "../utils/AsyncErrorHandler.js";
import CustomeError from "../utils/CustomError.js";

export const register = asyncErrorHandler(async (req, res) => {
  req.body.userId = req.auth._id;
  const data = await addressModel.create(req.body);

  res.status(201).json({
    message: "success",
    data: {
      data
    }
  })

})
export const getAddress = asyncErrorHandler(async (req, res, next) => {
  const data = await addressModel.find({ userId: req.auth._id });

  res.status(201).json({
    message: "success",
    length: data.length,
    data: {
      data
    }
  })
})
export const getAddressById = asyncErrorHandler(async (req, res, next) => {
  const data = await addressModel.findById(req.params.id);
  if (!data) {
    const error = new CustomeError("address not found", 404);
    return next(error);
  }
})
export const updateAddress = asyncErrorHandler(async (req, res) => {
  const data = await addressModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(201).json({
    message: "success",
    data: {
      data
    }
  })
})
export const deleteAddress = asyncErrorHandler(async (req, res) => {
  const data = await addressModel.findByIdAndDelete(req.params.id)
  res.status(201).json({
    message: "success",
    data: {
      data
    }
  })

})