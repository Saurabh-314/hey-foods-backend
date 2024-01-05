import restaurantModel from "../model/RestaurantModel.js"
import bcrypt from "bcrypt";
import CustomeError from "../utils/CustomError.js";
import jwt from "jsonwebtoken";
import asyncErrorHandler from "../utils/AsyncErrorHandler.js";
import menuModel from "../model/MenuModel.js";
import itemModel from "../model/ItemModel.js";
import orderModel from "../model/OrderModel.js";

export const shopRegister = asyncErrorHandler(async (req, res, next) => {

  const data = await restaurantModel.create(req.body);

  res.status(201).json({
    message: "success",
    data: {
      data
    }
  })
})

export const shopLogin = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(req.body)
  const restaurant = await restaurantModel.findOne({ email }).select("+password"); // it will fetch all document with password
  // console.log("restaurant", restaurant);
  if (!restaurant) {
    const error = new CustomeError('Username or Password is incorrect', 404);
    return next(error);
  }

  const matched = await bcrypt.compare(password, restaurant.password);
  if (!matched) {
    const error = new CustomeError('Username or Password is incorrect', 400);
    return next(error);
  }

  // create payload
  const payload = {
    email,
    _id: restaurant._id,
  }
  console.log("payload", payload)

  // create jwt token
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

  res.status(200).json({
    status: "success",
    data: {
      token
    }
  });

})

export const shopInfo = asyncErrorHandler(async (req, res, next) => {
  const restaurant = await restaurantModel.findById(req.auth._id);
  res.status(200).json({
    status: "success",
    data: {
      data: restaurant
    }
  });
})

export const shopUpdate = asyncErrorHandler(async (req, res, next) => {
  const restaurant = await restaurantModel.findByIdAndUpdate(req.auth._id, req.body, { new: true });
  res.status(200).json({
    status: "success",
    data: {
      data: restaurant
    }
  });

})

export const shopDelete = asyncErrorHandler(async (req, res, next) => {
  const deletedShop = await restaurantModel.deleteOne({ _id: req.auth._id });
  res.status(200).json({
    status: "success",
    data: {
      data: deletedShop
    }
  });

})

export const shopCategory = asyncErrorHandler(async (req, res, next) => {
  const shopCategory = await restaurantModel.findOne({ _id: req.auth._id }).select("category");
  res.status(200).json({
    status: "success",
    data: {
      data: shopCategory
    }
  });

})

export const shopMenuList = asyncErrorHandler(async (req, res, next) => {
  const menuList = await menuModel.find({ restaurantId: req.auth._id })

  res.status(201).json({
    message: "success",
    length: menuList.length,
    data: {
      data: menuList
    }
  })
})

export const shopItemList = asyncErrorHandler(async (req, res, next) => {
  const menuList = await itemModel.find({ restaurantId: req.auth._id });

  res.status(200).json({
    status: "success",
    length: menuList.length,
    data: {
      data: menuList
    }
  });
})

export const newOrder = asyncErrorHandler(async (req, res, next) => {
  const order = await orderModel.find({ restaurantId: req.auth._id, deliveryStatus: { $in: "pending" } },)

  res.status(200).json({
    status: "success",
    data: {
      data: order
    }
  });
})
export const orderDetails = asyncErrorHandler(async (req, res, next) => {
  const data = await orderModel.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      data
    }
  });
})
export const allCompleteOrders = asyncErrorHandler(async (req, res, next) => {
  const data = await orderModel.find({ restaurantId: req.auth._id, deliveryStatus: { $in: "complete" } },)

  res.status(200).json({
    status: "success",
    length: data.length,
    data: {
      data
    }
  });
})
export const settlePayments = asyncErrorHandler(async (req, res, next) => { })
export const pendingPayment = asyncErrorHandler(async (req, res, next) => {
  const data = await orderModel.find({ restaurantId: req.auth._id, paymentStatus: { $in: "incomplete" } },)

  res.status(200).json({
    status: "success",
    length: data.length,
    data: {
      data
    }
  });
})
export const changePassword = asyncErrorHandler(async (req, res, next) => { })
export const forgetPassword = asyncErrorHandler(async (req, res, next) => { })
export const shopLogout = asyncErrorHandler(async (req, res, next) => { })