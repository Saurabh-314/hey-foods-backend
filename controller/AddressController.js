import addressModel from "../model/AddressModel.js";
import asyncErrorHandler from "../utils/AsyncErrorHandler.js";

export const register = asyncErrorHandler(async (req, res) => {
  req.body.userId = req.auth.userId;
  
  // console.log("address register auth", req.body)
  const data = await addressModel.create(req.body);
  res.status(201).json({
    message: "success",
    data: {
      data
    }
  })

})
export const getAddress = asyncErrorHandler(async (req, res) => {
  // req.body.userId = req.auth.userId;
  // const data = await addressModel.findOne({ userId: req.auth.userId }).populate({
  //   path: "addressId"
  // });
  // console.log("address register auth", req.body)
  // const data = await address.create(req.body);
  res.status(201).json({
    message: "success",
    data: {
      data:"data"
    }
  })

})