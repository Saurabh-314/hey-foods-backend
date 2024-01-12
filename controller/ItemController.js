import itemModel from "../model/ItemModel.js";
import asyncErrorHandler from "../utils/AsyncErrorHandler.js";
import CustomeError from "../utils/CustomError.js";

export const register = asyncErrorHandler(async (req, res, next) => {

  req.body.restaurantId = req.auth._id;
  const item = await itemModel.create(req.body)

  res.status(200).json({
    message: "success",
    data: {
      data: item
    }
  })

})

export const getAllItems = asyncErrorHandler(async (req, res, next) => {
  const data = await itemModel.find({ isVerified: true });

  res.status(200).json({
    status: 'success',
    length: data.length,
    data: {
      data
    }
  })
})
export const getItemById = asyncErrorHandler(async (req, res, next) => {

  const item = await itemModel.findOne({ _id: req.query.id });
console.log("item",item)
  // if item not exists
  if (!item) {
    const error = new CustomeError("item not found", 404);
    return next(error);
  }
  // if item is not varified
  if (!item.isVerified) {
    const error = new CustomeError("item is not varified", 406);
    return next(error);
  }

  res.status(200).json({
    message: "success",
    data: {
      data: item
    }
  })
})

export const updateItem = asyncErrorHandler(async (req, res, next) => {

  const item = await itemModel.findOneAndUpdate({ _id: req.query.id }, req.body, { new: true });
  res.status(200).json({
    status: "success",
    data: {
      data: item
    }
  });
})
export const deleteItem = asyncErrorHandler(async (req, res, next) => {

  const item = await itemModel.deleteOne({ _id: req.params.id });
  res.status(200).json({
    status: "success",
    data: {
      data: item
    }
  });
})

