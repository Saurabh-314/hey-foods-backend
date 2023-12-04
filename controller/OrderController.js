import OrderModel from "../model/OrderModel.js";

export const register = async (req, res) => {
  const res1 = await OrderModel.create(req.body);
  res.status(201).json({
    message: "successful",
    data: {
      res1
    }
  })
}