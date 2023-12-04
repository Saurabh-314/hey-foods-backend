import ProductModel from "../model/ProductModel.js";

export const register = async (req, res) => {
  const res1 = await ProductModel.create(req.body);
  res.status(201).json({
    message: "successful",
    data: {
      res1
    }
  })
}