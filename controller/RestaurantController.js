import RestaurantModel from "../model/RestaurantModel.js"

export const register = async (req, res) => {
  const res1 = await RestaurantModel.create(req.body);
  res.status(201).json({
    message: "successful",
    data: {
      res1
    }
  })
}