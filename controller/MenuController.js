import menuModel from "../model/MenuModel.js";
import asyncErrorHandler from "../utils/AsyncErrorHandler.js";

export const register = asyncErrorHandler(async (req, res) => {
  const data = await menuModel.create({
    restaurantId: req.auth._id,
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
export const getMenu = asyncErrorHandler(async (req, res) => {
  const menuList = await menuModel.find({ restaurantId: req.auth._id })
  res.status(201).json({
    message: "success",
    length: menuList.length,
    data: {
      data: menuList
    }
  })
})
export const updateMenu = asyncErrorHandler(async (req, res) => {
  const updatedMenu = await menuModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
  res.status(200).json({
    status: "success",
    data: {
      data: updatedMenu
    }
  });

})
export const deleteMenu = asyncErrorHandler(async (req, res) => {
  const deletedMenu = await menuModel.deleteOne({ _id: req.params.id })
  res.status(201).json({
    message: "success",
    data: {
      data: deletedMenu
    }
  })
})
