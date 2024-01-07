import userModel from "../model/UserModel.js";
import orderModel from "../model/OrderModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncErrorHandler from "../utils/AsyncErrorHandler.js";
import CustomeError from "../utils/CustomError.js";


export const register = asyncErrorHandler(async (req, res, next) => {
  // const { firstName, lastName, email, password, dob, gender, mobileNumber, deviceToken } = req.body;

  // const salt = bcrypt.genSaltSync(10);
  // const hashedPassword = bcrypt.hashSync(password, salt);

  // const user = await userModel({
  // userId, firstName, lastName, email, password: hashedPassword, dob, gender, mobileNumber, deviceToken
  // });
  await userModel.create(req.body);
  // await user.save();
  res.status(201).json({
    status: "success"
  })
})

export const login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // const user = await User.findOne({ email }).select("password"); // it will fetch only password
  const user = await userModel.findOne({ email }).select("+password"); // it will fetch all document with password
  // console.log("user login ", user)
  if (!user) {
    const error = new CustomeError('Username or Password is incorrect', 404);
    return next(error);
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    const error = new CustomeError('Username or Password is incorrect', 400);
    return next(error);
  }

  // create payload
  const payload = {
    email,
    _id: user._id,
    role: user.role
  }
  console.log("payload", payload)

  // create jwt token
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });

  res.status(200).json({
    status: "success",
    data: {
      token
    }
  });

})

export const profile = asyncErrorHandler(async (req, res, next) => {
  // console.log(req.userId);
  const user = await userModel.findOne({ _id: req.auth._id }).populate({
    path: "_id"
  });
  if (!user) {
    const error = new CustomeError('User does not exist', 404);
    return next(error);
  }
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

export const profileUpdate = asyncErrorHandler(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(req.auth._id, req.body, { new: true });
  console.log("user ", user)
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

export const orderList = asyncErrorHandler(async (req, res, next) => {
  const data = await orderModel.find({ userId: req.auth._id, deliveryStatus: { $in: ["pending", "complete", "reject"] } })
  res.status(200).json({
    status: 'success',
    length: data.length,
    data: {
      data
    }
  })
})

export const notification = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

export const paymentHistory = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

export const forgetPassword = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

export const changePassword = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})


