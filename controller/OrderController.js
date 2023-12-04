import OrderModel from "../model/OrderModel.js";

export const register = async (req, res) => {
  try {
    const data = await OrderModel.create(req.body);
    res.status(201).json({
      message: "success",
      data: {
        data
      }
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message
    })
  }
}