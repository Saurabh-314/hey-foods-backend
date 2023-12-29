import OrderModel from "../model/OrderModel.js";
import asyncErrorHandler from "../utils/AsyncErrorHandler.js";

export const register =asyncErrorHandler( async (req, res) => {
  console.log("req.auth",req.auth)
  console.log("req.body",req.body)
  // const data = await OrderModel.create(req.body);
  res.status(201).json({
    message: "success",
    data: {
      data:"data"
    }
  })
})