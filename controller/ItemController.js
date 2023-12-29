import menuModel from "../model/MenuModel.js";
import itemModel from "../model/ItemModel.js";
import asyncErrorHandler from "../utils/AsyncErrorHandler.js";

export const register = asyncErrorHandler(async (req, res) => {
  const restaurantId = req.auth.restaurantId;
  const menuData = await menuModel.findOne({ restaurantId });

  req.body.menuId = menuData.menuId.toString();
  req.body.restaurantId = restaurantId;

  const data = await itemModel.create(req.body)

  res.status(200).json({
    message: "success",
    data: {
      data: data
    }
  })

})

export const getItemByItemId = asyncErrorHandler(async (req, res) => {
  // console.log("req.params", req.params.id)
  const data = await itemModel.findOne({ itemId: req.params.id });
  res.status(200).json({
    message: "success",
    data: {
      data: data
    }
  })
})

export const updateItem = asyncErrorHandler(async (req, res) => {
  const item = await itemModel.findByIdAndUpdate(req._id, req.body, { new: true });
  res.status(200).json({
    status: "success",
    data: {
      data: item
    }
  });
})
export const deleteItem = asyncErrorHandler(async (req, res) => {
  const item = await itemModel.deleteOne({ itemId: req.params.itemId });
  res.status(200).json({
    status: "success",
    data: {
      data: item
    }
  });
})

