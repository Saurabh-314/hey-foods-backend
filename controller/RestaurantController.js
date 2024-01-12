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
  const { email, mobileNumber, password } = req.body;

  var search = undefined;
  if (email) {
    search = { email: email };
  } else if (mobileNumber) {
    search = { mobileNumber: mobileNumber };
  }

  if (!search) {
    return next(new CustomeError("please Enter Email or Mobile Number", 400));
  }

  const restaurant = await restaurantModel.findOne(search).select("+password"); // it will fetch all document with password
  console.log("restaurant", restaurant)
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
    _id: restaurant._id,
    mobileNumber: restaurant.mobileNumber,
  }
  console.log("payload", payload)

  // create jwt token
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });

  //  save token in database
  await restaurantModel.findOneAndUpdate({ _id: restaurant._id }, { token });

  res.status(200).json({
    status: "success",
    data: {
      token: token
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

  if (menuList.length == 0) {
    const error = new CustomeError('there is no menu, please add menu', 404);
    return next(error);
  }

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

  if (menuList.length == 0) {
    const error = new CustomeError('there is no item, please add item', 404);
    return next(error);
  }

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

  if (order.length == 0) {
    const error = new CustomeError('no Order', 404);
    console.log("error", error)
    return next(error);
  }
  res.status(200).json({
    status: "success",
    length: order.length,
    data: {
      data: order
    }
  });
})

export const orderDetails = asyncErrorHandler(async (req, res, next) => {
  const data = await orderModel.findById(req.query.id);
  res.status(200).json({
    status: "success",
    data: {
      data
    }
  });
})
export const allCompleteOrders = asyncErrorHandler(async (req, res, next) => {
  const order = await orderModel.find({ restaurantId: req.auth._id, deliveryStatus: { $in: "complete" } },)

  if (order.length == 0) {
    const error = new CustomeError('there is no complete Order', 404);
    console.log("error", error)
    return next(error);
  }

  res.status(200).json({
    status: "success",
    length: order.length,
    data: {
      data: order
    }
  });
})
export const settlePayments = asyncErrorHandler(async (req, res, next) => {
  // console.log(req.query)
  const data = await orderModel.findByIdAndUpdate(req.query.id, { paymentStatus: "complete" });

  res.status(200).json({
    status: "success",
    data: {
      data: data
    }
  });
})
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