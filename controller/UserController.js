import userModel from "../model/UserModel.js";
import MenuModel from "../model/MenuModel.js";
import AddressModel from "../model/AddressModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncErrorHandler from "../utils/AsyncErrorHandler.js";
import CustomeError from "../utils/CustomError.js";


export const register = asyncErrorHandler(async (req, res, next) => {
  const { userId, firstName, lastName, email, password, dob, gender, mobileNumber, deviceToken } = req.body;
  // const existsEmail = await User.findOne({ email });

  // if (existsEmail) {
  //   const error = new CustomeError('Email already exists', 400);
  //   return next(error);
  // }

  // const existsNumber = await User.findOne({ mobileNumber });
  // if (existsNumber) {
  //   const error = new CustomeError('Mobile Number already exists', 400);
  //   return next(error);
  // }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await userModel({
    userId, firstName, lastName, email, password: hashedPassword, dob, gender, mobileNumber, deviceToken
  });
  await user.save();
  res.status(201).json({
    status: "success"
  })
})

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
    email,
    userId: user.userId,
    role: user.role
  }
  console.log(payload)

  // create jwt token
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
  // const token = jwt.sign(payload, process.env.JWT_SECRET_KEY,{ expiresIn: 30 });

  res.status(200).json({
    status: "success",
    data: {
      token
    }
  });

})

export const profile = asyncErrorHandler(async (req, res, next) => {
  // console.log(req.userId);
  const user = await userModel.findOne({ userId: req.auth.userId }).populate({
    path: "addressId"
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

export const updateProfile = asyncErrorHandler(async (req, res, next) => {
  const user = userModel.findByIdAndUpdate(req._id, req.body, { new: true });
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

export const orderList = asyncErrorHandler(async (req, res, next) => {
  const order = orderModel.find({ deliveryStatus: { $in: ["pending", "reject", "done"] } })
  res.status(200).json({
    status: 'success',
    data: {
      data: order
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


// export const allUser = asyncErrorHandler(async (req, res, next) => {
//   const user = await userModel.find({})

//   res.status(200).json({
//     status: 'success',
//     length: user.length,
//     data: {
//       user
//     }
//   })
// })

// export const allMenu = asyncErrorHandler(async (req, res, next) => {
//   const menu = await MenuModel.find({})
//   res.status(200).json({
//     status: 'success',
//     length: menu.length,
//     data: {
//       menu
//     }
//   })
// })

