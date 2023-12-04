import RatingModel from "../model/RatingModel.js";

export const register = async (req, res) => {
  const res1 = await RatingModel.create(req.body);
  res.status(201).json({
    message: "successful",
    data: {
      res1
    }
  })
}