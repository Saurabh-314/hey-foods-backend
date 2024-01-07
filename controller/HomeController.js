import item from "../model/ItemModel.js"
import asyncErrorHandler from "../utils/AsyncErrorHandler.js"
import CustomeError from "../utils/CustomError.js";

export const getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const data = await item.find();
  res.status(200).json({
    status: 'success',
    length: data.length,
    data: {
      data
    }
  })
})
export const findMyProduct = asyncErrorHandler(async (req, res, next) => {
  
  const data = await item.findById(req.query.id);

  if (!data) {
    const error = new CustomeError("product Not Found", 404);
    return next(error)
  }
  res.status(200).json({
    status: 'success',
    data: {
      data
    }
  })
})