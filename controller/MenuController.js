import menuModel from "../model/MenuModel.js";
import asyncErrorHandler from "../utils/AsyncErrorHandler.js";

export const register = asyncErrorHandler(async (req, res) => {
  const data = await Menu.create({
    restaurantId: req.auth.restaurantId,
    name: req.body.name,
    iconUrl: req.body.iconUrl
  });
  res.status(201).json({
    message: "success",
    data: {
      data: data
    }
  })
})
export const updateMenu = asyncErrorHandler(async (req, res) => {
  const updatedMenu = await menuModel.findByIdAndUpdate(req._id, req.body, { new: true });
  res.status(200).json({
    status: "success",
    data: {
      data: updatedMenu
    }
  });

})
export const deleteMenu = asyncErrorHandler(async (req, res) => {
  const deletedMenu = await menuModel.deleteOne({ menuId: req.params.id })
  res.status(201).json({
    message: "success",
    data: {
      data: deletedMenu
    }
  })
})

export const getProductByMenuId = asyncErrorHandler(async (req, res) => {
  // console.log("req.params", req.params.id)
  const data = await Menu.find({ menuId: req.params.id });
  res.status(200).json({
    message: "success",
    length: data.length,
    data: {
      data: data
    }
  })
})