import itemModel from "../model/ItemModel.js";
import asyncErrorHandler from "../utils/AsyncErrorHandler.js";

export const register = asyncErrorHandler(async (req, res) => {

  req.body.restaurantId = req.auth._id;
  const item = await itemModel.create(req.body)

  res.status(200).json({
    message: "success",
    data: {
      data: item
    }
  })

})

export const getItemById = asyncErrorHandler(async (req, res) => {
  
  const item = await itemModel.findOne({ _id: req.params.id });
  res.status(200).json({
    message: "success",
    data: {
      data: item
    }
  })
})

export const updateItem = asyncErrorHandler(async (req, res) => {

  const item = await itemModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
  res.status(200).json({
    status: "success",
    data: {
      data: item
    }
  });
})
export const deleteItem = asyncErrorHandler(async (req, res) => {

  const item = await itemModel.deleteOne({ _id: req.params.id });
  res.status(200).json({
    status: "success",
    data: {
      data: item
    }
  });
})

