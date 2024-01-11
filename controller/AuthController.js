import userModel from "../model/UserModel.js";
import orderModel from "../model/OrderModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncErrorHandler from "../utils/AsyncErrorHandler.js";
import CustomeError from "../utils/CustomError.js";

//  SignUp
export const register = asyncErrorHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, dob, gender, mobileNumber, deviceToken } = req.body;

  const salt = await bcrypt.genSalt(10);
  // password hash
  const hashPassword = await bcrypt.hash(password, salt);

  // password: hashPassword,
  const user = await userModel.create({
    firstName, lastName, email, password: hashPassword, dob, gender, mobileNumber, deviceToken
  });

  res.status(201).json({
    status: "success",
  })
})

//   SignIn with email and password
export const login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // const user = await User.findOne({ email }).select("password"); // it will fetch only password
  const user = await userModel.findOne({ email }).select("+password"); // it will fetch all document with password

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
    _id: user._id,
    mobileNumber: user.mobileNumber,
    role: user.role
  }
  console.log("payload", payload)

  // create jwt token
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });


  //  save token in database
  await userModel.findOneAndUpdate({ _id: user._id }, { token });

  res.status(200).json({
    status: "success",
    data: {
      token
    }
  });

})

//  generate OTP with mobile number
export const sendOtp = asyncErrorHandler(async (req, res, next) => {
  // console.log("send otp")
  const user = await userModel.findOne({ mobileNumber: req.body.mobileNumber });
  // console.log("user Data", user)
  if (!user) {
    const error = new CustomeError('Mobile Number Not Found', 404);
    return next(error);
  }
  // generate OTP
  const otp = Math.floor(Math.random() * 10000) + 1000;

  // save OTP in database
  await userModel.findOneAndUpdate({ _id: user._id }, { otp });
  // console.log("upd", upd)
  res.status(200).json({
    status: "success",
    data: {
      otp
    }
  });
})

//   verify otp with mobile number
export const verifyOtp = asyncErrorHandler(async (req, res, next) => {
  const { mobileNumber, otp } = req.body;

  const user = await userModel.findOne({ mobileNumber }).select("+otp");

  if (user.otp == "") {
    const error = new CustomeError('OTP is expired , please generate new OTP', 404);
    return next(error);
  }

  if (user.otp != otp) {
    const error = new CustomeError('Invalid Otp', 404);
    return next(error);
  }

  await userModel.findByIdAndUpdate(user._id, { $set: { otp: "" } });

  // create payload
  const payload = {
    _id: user._id,
    mobileNumber: user.mobileNumber,
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

//   User profile
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

//   profile Update
export const profileUpdate = asyncErrorHandler(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(req.auth._id, req.body, { new: true });
  // console.log("user ", user)
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

//  User Order list
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

//  User Notification list (not complete)
export const notification = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

//   Payment History (not complete)
export const paymentHistory = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

//  forget password (not complete)
export const newPassword = asyncErrorHandler(async (req, res, next) => {

  const user = await userModel.findOne({ mobileNumber: req.auth.mobileNumber });

  // // save new password in database
  const newData = await userModel.findOneAndUpdate({ _id: user._id }, { password: req.body.password, token: "" }, { new: true }).select("+token");

  res.status(200).json({
    status: "success",
    data: {
      data: newData
    }
  });
})
//  forget changePassword (not complete)
export const changePassword = asyncErrorHandler(async (req, res, next) => {

  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  if (newPassword !== confirmNewPassword) {
    const error = new CustomeError("New Password and Confirm New Password not match", 406);
    return next(error);
  }

  const user = await userModel.findOne({ mobileNumber: req.auth.mobileNumber }).select("+password");
  // console.log("user", user)
  const matchPassword = await bcrypt.compare(oldPassword, user.password);
  // console.log("matchPassword", matchPassword)
  if (!matchPassword) {
    const error = new CustomeError("Old Password not match", 400);
    return next(error);
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);
  // console.log("hashPassword", hashPassword)

  // // save new password in database
  const newData = await userModel.findOneAndUpdate({ _id: user._id }, { password: hashPassword, token: "" }, { new: true }).select("+token");

  res.status(200).json({
    status: "success",
    data: {
      data: newData
    }
  });
})

export const shopLogout = asyncErrorHandler(async(req,res,next)=>{
  
})