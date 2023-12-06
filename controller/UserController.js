import User from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncErrorHandler from "../utils/AsyncErrorHandler.js";
import CustomeError from "../utils/CustomError.js";


export const register = asyncErrorHandler(async (req, res, next) => {
  const { userId, firstName, lastName, email, password, dob, gender, mobileNumber, deviceToken } = req.body;
  const existsEmail = await User.findOne({ email });

  if (existsEmail) {
    const error = new CustomeError('Email already exists', 400);
    return next(error);
  }

  const existsNumber = await User.findOne({ mobileNumber });
  if (existsNumber) {
    const error = new CustomeError('Mobile Number already exists', 400);
    return next(error);
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await User({
    userId, firstName, lastName, email, password: hashedPassword, dob, gender, mobileNumber, deviceToken
  });
  await user.save();
  res.status(201).json({ status: "success" })
})

export const login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("password");

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
    userId: user.userId
  }

  // create jwt token
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

  res.status(200).json({
    status: "success",
    data: {
      token
    }
  });

})

export const getUserById = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findOne({ userId: req.params.id })
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