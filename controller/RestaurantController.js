import restaurantModel from "../model/RestaurantModel.js"
import bcrypt from "bcrypt";
import CustomeError from "../utils/CustomError.js";
import jwt from "jsonwebtoken";
import asyncErrorHandler from "../utils/AsyncErrorHandler.js";
import menuModel from "../model/MenuModel.js";
import itemModel from "../model/ItemModel.js";
import orderModel from "../model/OrderModel.js";

export const shopRegister = async (req, res, next) => {
  try {
    const data = await restaurantModel.create(req.body);
    res.status(201).json({
      message: "success",
      data: {
        data
      }
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message
    })
  }
}

export const shopLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const restaurant = await restaurantModel.findOne({ email }).select("+password"); // it will fetch all document with password
  console.log("restaurant", restaurant);
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
    restaurantId: restaurant.restaurantId,
  }
  console.log(payload)

  // create jwt token
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

  res.status(200).json({
    status: "success",
    data: {
      token
    }
  });

}

export const shopInfo = asyncErrorHandler(async (req, res, next) => {
  const restaurant = await restaurantModel.findOne({ restaurantId: req.restaurantId });
  res.status(200).json({
    status: "success",
    data: {
      data: restaurant
    }
  });
})

export const shopUpdate = asyncErrorHandler(async (req, res, next) => {
  const restaurant = await restaurantModel.findByIdAndUpdate(req._id, req.body, { new: true });
  res.status(200).json({
    status: "success",
    data: {
      data: restaurant
    }
  });

})

export const shopDelete = asyncErrorHandler(async (req, res, next) => {
  const deletedShop = await restaurantModel.deleteOne({ restaurantId: req.restaurantId });
  res.status(200).json({
    status: "success",
    data: {
      data: deletedShop
    }
  });

})

export const shopCategory = asyncErrorHandler(async (req, res, next) => { })

export const shopMenuList = asyncErrorHandler(async (req, res, next) => {
  const menuList = menuModel.find({ restaurantId: req.restaurantId });

  res.status(200).json({
    status: "success",
    data: {
      data: menuList
    }
  });
})

export const shopItemList = asyncErrorHandler(async (req, res, next) => {
  const menuList = itemModel.find({ restaurantId: req.restaurantId });

  res.status(200).json({
    status: "success",
    data: {
      data: menuList
    }
  });
})
export const newOrder = asyncErrorHandler(async (req, res, next) => {
  const order = orderModel.find({ restaurantId: req.restaurantId })

  res.status(200).json({
    status: "success",
    data: {
      data: order
    }
  });
})
export const orderDetails = asyncErrorHandler(async (req, res, next) => { })
export const allCompleteOrders = asyncErrorHandler(async (req, res, next) => { })
export const settlePayments = asyncErrorHandler(async (req, res, next) => { })
export const pendingPayment = asyncErrorHandler(async (req, res, next) => { })
export const changePassword = asyncErrorHandler(async (req, res, next) => { })
export const forgetPassword = asyncErrorHandler(async (req, res, next) => { })
export const shopLogout = asyncErrorHandler(async (req, res, next) => { })